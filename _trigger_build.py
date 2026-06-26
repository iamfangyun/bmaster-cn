import urllib.request, ssl, os, json

ctx = ssl.create_default_context()
TOKEN = open(os.path.expanduser("~/.toolbox_github_token")).read().strip()

# Trigger Pages build
req = urllib.request.Request(
    "https://api.github.com/repos/iamfangyun/bmaster-cn/pages/builds",
    method="POST",
    headers={"Authorization": "token " + TOKEN, "User-Agent": "deploy", "Content-Length": "0"}
)
try:
    resp = urllib.request.urlopen(req, context=ctx, timeout=10)
    print("Build triggered:", resp.status)
except urllib.error.HTTPError as e:
    body = e.read().decode()[:200]
    print(f"Trigger: {e.code} {body}")

# Check latest build status
import time
time.sleep(5)
req = urllib.request.Request(
    "https://api.github.com/repos/iamfangyun/bmaster-cn/pages/builds/latest",
    headers={"Authorization": "token " + TOKEN, "User-Agent": "deploy"}
)
build = json.loads(urllib.request.urlopen(req, context=ctx, timeout=10).read())
print(f"Latest build: status={build['status']}, created={build['created_at']}")
