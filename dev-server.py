#!/usr/bin/env python3
"""Local preview server — serves . as static files and maps /feed → feed.html."""
from __future__ import annotations

import argparse
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parent


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def translate_path(self, path: str) -> str:
        parsed = urlparse(path)
        clean = parsed.path.rstrip("/") or "/"
        if clean in ("/feed", "/feed.html"):
            return str(ROOT / "feed.html")
        return super().translate_path(path)

    def copyfile(self, source, outputfile):
        try:
            super().copyfile(source, outputfile)
        except (BrokenPipeError, ConnectionResetError):
            # Browser cancelled media range request — normal, not a real failure
            pass

    def log_message(self, fmt: str, *args) -> None:
        # Quieter logs; still show 404s
        if args and isinstance(args[0], str) and args[0].startswith("code 404"):
            super().log_message(fmt, *args)
            return
        if args and str(args[0]).startswith('"GET') and " 404 " in str(args[0]):
            super().log_message(fmt, *args)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("-p", "--port", type=int, default=3000)
    args = parser.parse_args()
    server = ThreadingHTTPServer(("127.0.0.1", args.port), Handler)
    print(f"Serving {ROOT}")
    print(f"  Feed:     http://127.0.0.1:{args.port}/feed")
    print(f"  Refresh:  http://127.0.0.1:{args.port}/feed?refresh")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")


if __name__ == "__main__":
    main()
