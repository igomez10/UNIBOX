import os
import redis
import logging
from flask import Flask , send_from_directory
import sys
# r = redis.from_url(os.environ.get('REDIS_URL'))

app = Flask(__name__)
app.logger.addHandler(logging.StreamHandler(sys.stdout))
app.logger.setLevel(logging.DEBUG)
# @app.route("/")
# def hello():
#     return "/public/index.html"


@app.route('/', defaults={'path': 'index.html'})

@app.route("/<path:path>")
def serve_file(path):
    app.logger.debug("sirviendo archivo" + path)
    return send_from_directory('public', path)


if __name__ == "__main__":
    app.run()
