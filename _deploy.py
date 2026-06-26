"""Deploy bmaster.cn to GitHub Pages (main branch) via Contents API."""
import json, base64, os, urllib.request, ssl, time

ctx = ssl.create_default_context()
TOKEN = open(os.path.expanduser("~/.toolbox_github_token")).read().strip()
REPO = "iamfangyun/bmaster-cn"
API = f"https://api.github.com/repos/{REPO}/contents"
BRANCH = "main"
headers = {"Authorization": f"token {TOKEN}", "User-Agent": "deploy"}

BASE = os.path.dirname(os.path.abspath(__file__))

# Files to upload: (local_path_relative, repo_path)
files = [
    ("index.html", "index.html"),
    ("favicon.svg", "favicon.svg"),
    ("robots.txt", "robots.txt"),
    ("sitemap.xml", "sitemap.xml"),
    ("ads.txt", "ads.txt"),
    ("zh/index.html", "zh/index.html"),
    ("zh/articles/ai-cost-report-2026.html", "zh/articles/ai-cost-report-2026.html"),
    ("zh/articles/chatgpt-vs-claude-api.html", "zh/articles/chatgpt-vs-claude-api.html"),
    ("zh/articles/ai-coding-save-money.html", "zh/articles/ai-coding-save-money.html"),
    ("articles/ai-cost-report-2026.html", "articles/ai-cost-report-2026.html"),
    ("articles/chatgpt-vs-claude-api.html", "articles/chatgpt-vs-claude-api.html"),
    ("articles/ai-coding-save-money.html", "articles/ai-coding-save-money.html"),
    ("WW_verify_xqEGSZKTDvRd0JVI.txt", "WW_verify_xqEGSZKTDvRd0JVI.txt"),
    ("mortgage-calculator/index.html", "mortgage-calculator/index.html"),
    ("mortgage-calculator/og-image.png", "mortgage-calculator/og-image.png"),
    (".nojekyll", ".nojekyll"),
]

def upload(local_rel, repo_path):
    local_full = os.path.join(BASE, local_rel)
    if not os.path.exists(local_full):
        print(f"  SKIP {repo_path} — local file not found")
        return
    
    with open(local_full, "rb") as f:
        content_bytes = f.read()
    content_b64 = base64.b64encode(content_bytes).decode()
    
    # Check if file exists (get SHA for update)
    sha = None
    try:
        req = urllib.request.Request(
            f"{API}/{repo_path}?ref={BRANCH}",
            headers=headers
        )
        resp = urllib.request.urlopen(req, context=ctx, timeout=15)
        existing = json.loads(resp.read())
        sha = existing["sha"]
    except urllib.error.HTTPError as e:
        if e.code != 404:
            raise
    
    data = json.dumps({
        "message": f"Deploy {repo_path}",
        "content": content_b64,
        "branch": BRANCH,
        **({"sha": sha} if sha else {})
    }).encode()
    
    req = urllib.request.Request(
        f"{API}/{repo_path}",
        data=data,
        method="PUT",
        headers={**headers, "Content-Type": "application/json"}
    )
    resp = urllib.request.urlopen(req, context=ctx, timeout=30)
    result = json.loads(resp.read())
    print(f"  {'UPDATED' if sha else 'CREATED'} {repo_path} ({len(content_bytes):,} bytes)")

print(f"Deploying {len(files)} files to {REPO} ({BRANCH})...")
for local_rel, repo_path in files:
    upload(local_rel, repo_path)
    time.sleep(0.3)

# Trigger Pages build
print("\nTriggering Pages build...")
req = urllib.request.Request(
    f"https://api.github.com/repos/{REPO}/pages/builds",
    method="POST",
    headers={**headers, "Content-Length": "0"}
)
try:
    resp = urllib.request.urlopen(req, context=ctx, timeout=10)
    print(f"  Build triggered: {resp.status}")
except urllib.error.HTTPError as e:
    print(f"  Trigger: {e.code}")

print("\n✅ Deploy complete!")
