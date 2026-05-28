/**
 * Utility to merge class names (simple version without clsx)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Format number as Indian currency (₹)
 */
export function formatCurrency(amount: number): string {
  if (amount >= 100000) {
    const lakhs = amount / 100000;
    return `₹${lakhs % 1 === 0 ? lakhs.toFixed(0) : lakhs.toFixed(1)}L`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
}

/**
 * Format number as Indian currency (full)
 */
export function formatCurrencyFull(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

/**
 * Smooth scroll to a section by ID
 */
export function scrollToSection(sectionId: string): void {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * Solar subsidy calculator logic
 * Updated with Telangana state subsidy (TSREDCO top-up)
 */
export interface SubsidyResult {
  systemSize: number;        // kW
  totalCost: number;         // ₹
  centralSubsidy: number;    // ₹
  stateSubsidy: number;      // ₹
  totalSubsidy: number;      // ₹
  netCost: number;           // ₹
  monthlySavings: number;    // ₹
  annualSavings: number;     // ₹
  paybackYears: number;      // years
  savings25Year: number;     // ₹
  monthlyGeneration: number; // units
}

/**
 * Calculate exact monthly TGSPDCL (formerly TSSPDCL) domestic bill based on monthly unit consumption.
 * Implements the category-telescopic tariff order.
 */
export function calculateTGSPDCLBill(units: number, sanctionedLoad: number = 3): number {
  if (units <= 0) {
    // Fixed charges only + customer charges for lowest tier
    const fixedCharges = sanctionedLoad * 10;
    const customerCharges = 40;
    return fixedCharges + customerCharges;
  }

  let energyCharges = 0;
  let customerCharges = 0;

  if (units <= 100) {
    // Category LT-I(A)
    if (units <= 50) {
      energyCharges = units * 1.95;
      customerCharges = 40;
    } else {
      energyCharges = (50 * 1.95) + ((units - 50) * 3.10);
      customerCharges = 70;
    }
  } else if (units <= 200) {
    // Category LT-I(B)(i)
    energyCharges = (100 * 3.40) + ((units - 100) * 4.80);
    customerCharges = 90;
  } else {
    // Category LT-I(B)(ii)
    if (units <= 300) {
      energyCharges = (200 * 5.10) + ((units - 200) * 7.70);
      customerCharges = 125;
    } else if (units <= 400) {
      energyCharges = (200 * 5.10) + (100 * 7.70) + ((units - 300) * 9.00);
      customerCharges = 140;
    } else if (units <= 800) {
      energyCharges = (200 * 5.10) + (100 * 7.70) + (100 * 9.00) + ((units - 400) * 9.50);
      customerCharges = 160;
    } else {
      energyCharges = (200 * 5.10) + (100 * 7.70) + (100 * 9.00) + (400 * 9.50) + ((units - 800) * 10.00);
      customerCharges = 160;
    }
  }

  // Fixed charges: ₹10 per kW of sanctioned load (unless above 800 units where it might go up, standard is ₹10/kW)
  const fixedCharges = sanctionedLoad * 10;

  // Electricity duty: 6% on energy charges
  const duty = energyCharges * 0.06;

  return Math.round(energyCharges + customerCharges + fixedCharges + duty);
}

/**
 * Solves for the monthly consumption units that yield a given monthly bill target.
 * Uses binary search (bisection method) because the billing function is strictly monotonic.
 */
export function findUnitsFromBill(targetBill: number, sanctionedLoad: number = 3): number {
  const minBill = calculateTGSPDCLBill(0, sanctionedLoad);
  if (targetBill <= minBill) return 0;

  let low = 0;
  let high = 3000; // Cap search at 3000 units (~₹30,000+ bills)
  let mid = 0;
  
  // 15 iterations is more than enough for decimal-point accuracy
  for (let i = 0; i < 15; i++) {
    mid = (low + high) / 2;
    const bill = calculateTGSPDCLBill(mid, sanctionedLoad);
    if (bill < targetBill) {
      low = mid;
    } else {
      high = mid;
    }
  }

  return Math.round(mid);
}

export function getTurnkeyCost(systemSize: number): number {
  if (systemSize <= 1) return 90000;
  if (systemSize === 2) return 160000;
  if (systemSize === 3) return 220000;
  if (systemSize === 4) return 285000;
  if (systemSize === 5) return 350000;
  if (systemSize === 6) return 410000;
  if (systemSize === 7) return 470000;
  if (systemSize === 8) return 525000;
  if (systemSize === 9) return 580000;
  if (systemSize === 10) return 640000;
  return 640000 + (systemSize - 10) * 60000;
}

export function calculateSubsidy(monthlyBill: number): SubsidyResult {
  // Determine standard sanctioned load based on monthly bill size
  const sanctionedLoad = monthlyBill <= 2000 ? 2 : monthlyBill <= 5000 ? 3 : monthlyBill <= 9000 ? 5 : 10;
  
  // Solve for units
  const monthlyUnits = findUnitsFromBill(monthlyBill, sanctionedLoad);

  // 1 kW generates ~4 units/day = ~120 units/month in Hyderabad
  const unitsPerKw = 120;
  
  // Recommended system size (between 1 and 15 kW)
  const systemSize = Math.max(1, Math.min(15, Math.ceil(monthlyUnits / unitsPerKw)));

  // Turnkey cost using PDF 2 competitive pricing
  const totalCost = getTurnkeyCost(systemSize);

  // Central subsidy (PM Surya Ghar Muft Bijli Yojana flat limits)
  let centralSubsidy: number;
  if (systemSize === 1) {
    centralSubsidy = 30000;
  } else if (systemSize === 2) {
    centralSubsidy = 60000;
  } else {
    centralSubsidy = 78000;
  }

  const stateSubsidy = 0;
  const totalSubsidy = centralSubsidy;
  const netCost = Math.max(0, totalCost - totalSubsidy);

  // Monthly generation & savings
  const monthlyGeneration = systemSize * unitsPerKw;
  const netGridUnits = Math.max(0, monthlyUnits - monthlyGeneration);
  const newNetBill = calculateTGSPDCLBill(netGridUnits, sanctionedLoad);
  
  // Surplus units valued at average power purchase cost of ₹4.0/unit
  const surplusUnits = Math.max(0, monthlyGeneration - monthlyUnits);
  const surplusCredit = surplusUnits * 4.0;
  
  // Savings = Old Bill - New Net Bill + Surplus Credits
  const monthlySavings = Math.round(monthlyBill - newNetBill + surplusCredit);
  const annualSavings = monthlySavings * 12;
  const paybackYears = annualSavings > 0 ? parseFloat((netCost / annualSavings).toFixed(1)) : 0;

  // 25-year savings (accounting for ~5% annual tariff rise)
  let savings25Year = 0;
  let cumulativeSavings = 0;
  let currentTariffEscalation = 1.0;
  
  for (let year = 1; year <= 25; year++) {
    // Escalate the old bill and the new bill base components by 5%
    const oldBillEscalated = monthlyBill * currentTariffEscalation;
    const newBillEscalated = newNetBill * currentTariffEscalation;
    const creditEscalated = surplusCredit * currentTariffEscalation;
    
    cumulativeSavings += (oldBillEscalated - newBillEscalated + creditEscalated) * 12;
    currentTariffEscalation *= 1.05;
  }
  savings25Year = Math.round(cumulativeSavings);

  return {
    systemSize,
    totalCost,
    centralSubsidy,
    stateSubsidy,
    totalSubsidy,
    netCost,
    monthlySavings,
    annualSavings,
    paybackYears,
    savings25Year,
    monthlyGeneration,
  };
}

/**
 * Generate 25-year savings data for charts
 */
export function generateSavingsData() {
  const data = [];
  const baseUnits = 360; // 3 kW system, ~360 units/month
  const sanctionedLoad = 3;
  
  const baseOldBill = calculateTGSPDCLBill(baseUnits, sanctionedLoad);
  const baseNewBill = calculateTGSPDCLBill(0, sanctionedLoad);
  const baseMonthlySavings = baseOldBill - baseNewBill;

  let cumulativeFlat = 0;
  let cumulativeRising = 0;
  let currentTariffEscalation = 1.0;

  for (let year = 1; year <= 25; year++) {
    cumulativeFlat += baseMonthlySavings * 12;
    
    const escalatedOldBill = baseOldBill * currentTariffEscalation;
    const escalatedNewBill = baseNewBill * currentTariffEscalation;
    const escalatedSavings = (escalatedOldBill - escalatedNewBill) * 12;
    
    cumulativeRising += escalatedSavings;

    data.push({
      year,
      flatRate: Math.round(cumulativeFlat),
      risingRate: Math.round(cumulativeRising),
      flatLabel: formatCurrency(Math.round(cumulativeFlat)),
      risingLabel: formatCurrency(Math.round(cumulativeRising)),
    });

    currentTariffEscalation *= 1.05;
  }

  return data;
}

/**
 * Smoothly scrolls to an element using requestAnimationFrame for perfect cross-browser animation,
 * even when Lenis or other libraries override CSS scroll-behavior.
 */
export function smoothScrollTo(elementId: string): void {
  const targetId = elementId.startsWith('#') ? elementId : `#${elementId}`;
  const target = document.querySelector(targetId);
  if (!target) return;

  const offset = 80; // Fixed navbar offset
  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 900; // 900ms smooth scroll
  let startTimestamp: number | null = null;

  const step = (timestamp: number) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const elapsed = timestamp - startTimestamp;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease out cubic
    const ease = 1 - Math.pow(1 - progress, 3);
    
    window.scrollTo(0, startPosition + distance * ease);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
}

/**
 * Throttles scroll/resize events using requestAnimationFrame to prevent layout thrashing and excess layout repaints.
 */
export function throttleAnimationFrame<T extends (...args: any[]) => any>(fn: T): (...args: Parameters<T>) => void {
  let active = false;
  return (...args: Parameters<T>) => {
    if (active) return;
    active = true;
    requestAnimationFrame(() => {
      fn(...args);
      active = false;
    });
  };
}

/**
 * Checks if the user device has low hardware specifications or has prefers-reduced-motion active,
 * enabling lightweight rendering paths automatically.
 */
export function checkIsLowEndOrReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;

  // 1. Check for reduced motion preference
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motionQuery.matches) return true;

  // 2. Check for low-end device specifications (CPU Cores or Device RAM)
  const cores = navigator.hardwareConcurrency;
  const memory = (navigator as any).deviceMemory; // Not supported on all browsers, standard on Chromium/Android

  if (cores !== undefined && cores < 4) return true;
  if (memory !== undefined && memory < 4) return true;

  return false;
}

