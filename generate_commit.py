import subprocess
import json
import re

MODEL = "codellama"

def run_cmd(cmd):
    try:
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            shell=True,
            encoding="utf-8",
            errors="replace"
        )
        return result.stdout.strip()
    except Exception:
        return ""

def get_staged_files():
    output = run_cmd("git diff --cached --name-status")
    files = []
    for line in output.splitlines():
        if not line.strip():
            continue
        parts = line.split("\t", 1)
        if len(parts) < 2:
            continue
        status, file_path = parts
        diff_text = run_cmd(f"git diff --cached -- {file_path}")
        files.append((status, file_path, diff_text))
    return files

def detect_commit_prefix(status, file_path, diff_text):
    lower_path = file_path.lower()
    diff_lower = diff_text.lower()

    # NEW: For new files
    if status in ["??", "A"]:
        return "NEW" if "test" not in lower_path else "TEST"

    # DOC: For documentation files
    if lower_path.endswith((".md", ".rst", ".txt")) or "readme" in lower_path:
        return "DOC"

    # TEST: For test files
    if lower_path.endswith((".test.js", ".spec.js", ".test.ts", ".spec.ts")):
        return "TEST"

    # FIX: For error fixes or spelling mistakes
    if "fix" in diff_lower or "bug" in diff_lower or "typo" in diff_lower or "spelling" in diff_lower:
        return "FIX"

    # UP: For library or driver updates
    if "import " in diff_lower or "require(" in diff_lower or "version" in diff_lower or "dependency" in diff_lower or "driver" in diff_lower:
        return "UP"

    # ENC: For logic changes
    if "def " in diff_lower or "function " in diff_lower or "if " in diff_lower or "for " in diff_lower or "while " in diff_lower:
        return "ENC"

    # IMP: For small changes like variable names, Javadoc, or statement updates
    if diff_text.count("\n") < 5 or "javadoc" in diff_lower or "comment" in diff_lower:
        return "IMP"

    return "MISC"

def truncate_diff(diff_text, max_lines=50):
    lines = diff_text.splitlines()
    if len(lines) > max_lines:
        return "\n".join(lines[:max_lines]) + "\n[Diff truncated]"
    return diff_text

def extract_diff_summary(diff_text, file_path):
    summary_lines = []
    lower_path = file_path.lower()
    is_code = lower_path.endswith((".py", ".js", ".ts", ".java", ".cpp", ".c", ".cs"))
    is_doc = lower_path.endswith((".md", ".rst", ".txt")) or "readme" in lower_path

    # Collect changed lines
    for line in diff_text.splitlines():
        line = line.strip()
        if line.startswith(("+", "-")) and not line.startswith(("+++", "---")):
            content = line[1:].strip()
            if content and not content.startswith(("{", "}", "//", "#", "/*", "*", "<!")):
                prefix = "Added " if line.startswith("+") else "Removed "
                summary_lines.append(f"{prefix}{content}")
        if len(summary_lines) >= 5:
            break

    # Generate context-aware summary
    if not summary_lines:
        if is_doc:
            # For documentation, extract nearby text for context
            lines = diff_text.splitlines()
            for i, line in enumerate(lines):
                if line.startswith(("+", "-")) and not line.startswith(("+++", "---")):
                    content = line[1:].strip()
                    if content:
                        # Include the line and up to two surrounding lines for context
                        context = []
                        if i > 0:
                            context.append(lines[i-1].strip())
                        context.append(line.strip())
                        if i < len(lines) - 1:
                            context.append(lines[i+1].strip())
                        return f"Modified {file_path}: {' | '.join(context)}"
            return f"Updated formatting or structure in {file_path}."
        return f"Updated formatting or minor code in {file_path}."

    if is_doc:
        return f"Updated documentation in {file_path}: {' | '.join(summary_lines)}"
    elif is_code:
        if "def " in diff_text or "function " in diff_text:
            return f"Added/modified function(s) in {file_path}: {' | '.join(summary_lines)}"
        elif "import " in diff_text or "require(" in diff_text:
            return f"Added imports/functionality in {file_path}: {' | '.join(summary_lines)}"
        elif "class " in diff_text:
            return f"Added/modified class in {file_path}: {' | '.join(summary_lines)}"
        else:
            return f"Modified code in {file_path}: {' | '.join(summary_lines)}"
    return f"Updated {file_path}: {' | '.join(summary_lines)}"

def generate_commit_summaries(files):
    results = []
    for status, file_path, diff_text in files:
        prefix = detect_commit_prefix(status, file_path, diff_text)
        diff_summary = extract_diff_summary(diff_text, file_path)
        diff_text = truncate_diff(diff_text)
        prompt = (
            f"Analyze the git diff and generate a concise commit message.\n"
            f"Instructions:\n"
            f"1. Summarize key functionality added, removed, or modified in 1-2 sentences.\n"
            f"2. Infer the purpose (e.g., bug fix, feature, refactor).\n"
            f"3. Avoid vague terms like 'updated' or 'changed'.\n"
            f"4. Ignore formatting/whitespace changes.\n"
            f"5. Return valid JSON: {{ \"summary\": \"{prefix}: {file_path}\", \"description\": \"<summary>\" }}\n\n"
            f"File: {file_path}\nCommit type: {prefix}\nDiff:\n```\n{diff_text}\n```\n"
        )
        result = subprocess.run(
            ["ollama", "run", MODEL],
            input=prompt,
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace"
        )
        response_text = result.stdout.strip()
        try:
            json_obj = json.loads(response_text)
            if not json_obj.get("description"):
                json_obj["description"] = diff_summary
            results.append(json_obj)
        except Exception:
            results.append({
                "summary": f"{prefix}: {file_path}",
                "description": diff_summary
            })
    return results

def main():
    files = get_staged_files()
    if not files:
        print("No staged changes found.")
        return
    results = generate_commit_summaries(files)
    for entry in results:
        print(f"{entry['summary']}\nDescription: {entry['description']}\n")

if __name__ == "__main__":
    main()