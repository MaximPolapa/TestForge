from dotenv import load_dotenv
from together import Together
import os

load_dotenv("key.env")
API_KEY = os.getenv("TOGETHER_API_KEY")

client = Together(api_key=API_KEY)

def find_py_files(repo_path, max_files=3):
    py_files = []
    for root, _, files in os.walk(repo_path):
        for file in files:
            if file.endswith(".py"):
                py_files.append(os.path.join(root, file))
                if len(py_files) >= max_files:
                    return py_files
    return py_files

def read_files(file_list):
    return {f: open(f, encoding="utf-8").read() for f in file_list if os.path.exists(f)}

def generate_unit_tests(file_contents):
    prompt = "Analyze the following files and generate unit tests for them using pytest:\n"
    for filename, content in file_contents.items():
        prompt += f"\n### FILE: {filename}\n{content}\n"
    prompt += "\nGenerate only valid Python code."

    response = client.chat.completions.create(
        model="meta-llama/Llama-3.3-70B-Instruct-Turbo",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=4096,
        temperature=0.5,
        top_p=0.9,
        stream=False
    )
    return response.choices[0].message.content

def save_unit_tests(code, output_path):
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(code)

def generate_tests_and_return(repo_path="/opt/app", output_file="/opt/app/test_generated.py"):
    files = find_py_files(repo_path)
    print(f"🧾 Found files: {files}")
    if not files:
        print("❌ No Python files found.")
        return None
    content = read_files(files)
    unit_code = generate_unit_tests(content)
    save_unit_tests(unit_code, output_file)
    return output_file
