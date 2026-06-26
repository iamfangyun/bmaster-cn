import urllib.request, ssl, time, json, os

ctx = ssl.create_default_context()
token_path = os.path.expanduser("~/.toolbox_github_token")
TOKEN = open(token_path).read().strip()
REPO = "iamfangyun/bmaster-cn"
headers = {"Authorization": f"token {TOKEN}", "User-Agent": "verify"}
API = f"https://api.github.com/repos/{REPO}"

print("Waiting 30s for Pages build...")
time.sleep(30)

# Check build status
req = urllib.request.Request(f"{API}/pages/builds?per_page=3", headers=headers)
resp = urllib.request.urlopen(req, context=ctx, timeout=15)
builds = json.loads(resp.read())
for b in builds[:3]:
    err_msg = "none"
    if b.get("error"):
        err_msg = b["error"].get("message", "unknown")
    print(f"  Build: status={b.get('status')} error={err_msg} at={b.get('created_at')}")

# Pages status
req2 = urllib.request.Request(f"{API}/pages", headers=headers)
resp2 = urllib.request.urlopen(req2, context=ctx, timeout=15)
pages_data = json.loads(resp2.read())
print(f"\nPages status: {pages_data.get('status')}")

# Check live URL
print("\n=== Live URL check ===")
for path in ["/mortgage-calculator/", "/"]:
    url = f"https://bmaster.cn{path}"
    try:
        req3 = urllib.request.Request(url, headers={"User-Agent": "verify"})
        resp3 = urllib.request.urlopen(req3, context=ctx, timeout=15)
        html = resp3.read().decode("utf-8")
        has_calc = "monthlyPI" in html
        has_title = "True Mortgage Calculator" in html
        print(f"  {path}: {resp3.status} ({len(html):,} chars) calc_js={has_calc} title={has_title}")
    except Exception as e:
        print(f"  {path}: {e}")
