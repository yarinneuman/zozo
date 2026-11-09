"""Reads a JSON list of English strings on stdin, prints a JSON list of Hebrew translations (Argos Translate)."""
import json, sys
import argostranslate.package as pkg
import argostranslate.translate as tr

texts = json.load(sys.stdin)
pkg.update_package_index()
have = {(l.code) for l in tr.get_installed_languages()}
if not {"en", "he"} <= have:
    p = next(p for p in pkg.get_available_packages() if p.from_code == "en" and p.to_code == "he")
    pkg.install_from_path(p.download())
print(json.dumps([tr.translate(t, "en", "he") for t in texts], ensure_ascii=False))
