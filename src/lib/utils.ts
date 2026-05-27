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

export function calculateSubsidy(monthlyBill: number): SubsidyResult {
  // Average tariff ₹7.7/unit in Telangana
  const tariffRate = 7.7;
  const monthlyUnits = monthlyBill / tariffRate;

  // 1 kW generates ~4 units/day = ~120 units/month in Hyderabad
  const unitsPerKw = 120;
  const systemSize = Math.max(1, Math.min(10, Math.ceil(monthlyUnits / unitsPerKw)));

  // Cost per kW (approximate market rate including installation)
  const costPerKw = systemSize <= 3 ? 88000 : systemSize <= 5 ? 82000 : 76000;
  const totalCost = systemSize * costPerKw;

  // Central subsidy (PM Surya Ghar Muft Bijli Yojana)
  let centralSubsidy: number;
  if (systemSize <= 2) {
    centralSubsidy = systemSize * 30000;
  } else if (systemSize <= 3) {
    centralSubsidy = 60000 + (systemSize - 2) * 18000;
  } else {
    centralSubsidy = 78000; // Max central subsidy capped at ₹78,000
  }

  // State subsidy is disabled per user request (was Telangana TSREDCO top-up)
  const stateSubsidy = 0;
  const totalSubsidy = centralSubsidy;
  const netCost = Math.max(0, totalCost - totalSubsidy);

  const monthlyGeneration = systemSize * unitsPerKw;
  const monthlySavings = Math.round(monthlyGeneration * tariffRate);
  const annualSavings = monthlySavings * 12;
  const paybackYears = annualSavings > 0 ? parseFloat((netCost / annualSavings).toFixed(1)) : 0;

  // 25-year savings (accounting for ~5% annual tariff rise)
  let savings25Year = 0;
  let currentTariff = tariffRate;
  for (let year = 1; year <= 25; year++) {
    savings25Year += monthlyGeneration * 12 * currentTariff;
    currentTariff *= 1.05;
  }

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
  const baseUnits = 360 * 12; // 3 kW system, ~360 units/month
  let currentTariff = 7.7;
  let cumulativeFlat = 0;
  let cumulativeRising = 0;

  for (let year = 1; year <= 25; year++) {
    const flatSavings = baseUnits * 7.7;
    const risingSavings = baseUnits * currentTariff;

    cumulativeFlat += flatSavings;
    cumulativeRising += risingSavings;

    data.push({
      year,
      flatRate: Math.round(cumulativeFlat),
      risingRate: Math.round(cumulativeRising),
      flatLabel: formatCurrency(Math.round(cumulativeFlat)),
      risingLabel: formatCurrency(Math.round(cumulativeRising)),
    });

    currentTariff *= 1.05;
  }

  return data;
}
