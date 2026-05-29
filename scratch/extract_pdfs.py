import PyPDF2
import os

pdf_dir = r"c:\Users\navee\OneDrive\Pictures\myhomesolar_play\pdfs"
output_dir = r"c:\Users\navee\OneDrive\Pictures\myhomesolar_play\scratch"

for filename in os.listdir(pdf_dir):
    if filename.endswith(".pdf"):
        pdf_path = os.path.join(pdf_dir, filename)
        txt_path = os.path.join(output_dir, filename.replace(".pdf", ".txt"))
        print(f"Extracting {pdf_path} to {txt_path}...")
        
        try:
            with open(pdf_path, "rb") as f:
                reader = PyPDF2.PdfReader(f)
                text_content = []
                for i, page in enumerate(reader.pages):
                    text_content.append(f"--- Page {i+1} ---")
                    text_content.append(page.extract_text() or "")
                
                with open(txt_path, "w", encoding="utf-8") as out:
                    out.write("\n".join(text_content))
                print(f"Successfully extracted {len(reader.pages)} pages.")
        except Exception as e:
            print(f"Error extracting {filename}: {e}")
