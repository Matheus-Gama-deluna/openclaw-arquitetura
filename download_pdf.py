import urllib.request
import sys
import subprocess

url = 'https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})

try:
    print("Downloading...")
    with urllib.request.urlopen(req) as response:
        with open('claude_skills.pdf', 'wb') as out_file:
            out_file.write(response.read())
    print("Download successful. Now trying to read text...")
    
    # Try using pypdf2
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pypdf"])
    from pypdf import PdfReader
    
    reader = PdfReader('claude_skills.pdf')
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
        
    with open('claude_skills.txt', 'w', encoding='utf-8') as f:
        f.write(text)
    print("Extracted to txt")
    
except Exception as e:
    print(f"Error: {e}")
