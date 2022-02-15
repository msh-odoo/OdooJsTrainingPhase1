# -*- coding: utf-8 -*-

import io
# import copy
import hashlib
from http.client import responses
import json
import logging
import os
from lxml import etree
from collections import OrderedDict

import werkzeug
from werkzeug.exceptions import HTTPException
# from werkzeug.exceptions import NotFound
try:
    from werkzeug.middleware.shared_data import SharedDataMiddleware
except ImportError:
    from werkzeug.wsgi import SharedDataMiddleware
from werkzeug.routing import Map
from werkzeug.routing import Rule
# from werkzeug.urls import url_parse
# from werkzeug.utils import redirect
from werkzeug.wrappers import Request
from werkzeug.wrappers import Response

_logger = logging.getLogger(__name__)

class Application:
    NAME_TEMPLATE_DIRECTIVE = 't-name'

    def __init__(self):
        self.template_dict = OrderedDict()
        self.url_map = Map(
            [
                Rule("/", endpoint="index"),
                Rule("/simple_async_await", endpoint="simple_async_await"),
                Rule("/simple_promise", endpoint="simple_promise"),
                Rule("/advance_async_await", endpoint="advance_async_await"),
                Rule("/advance_promise", endpoint="advance_promise"),
            ]
        )

    def __call__(self, environ, start_response):
        return self.dispatch(environ, start_response)

    def dispatch(self, environ, start_response):
        request = Request(environ)
        adapter = self.url_map.bind_to_environ(request.environ)
        try:
            endpoint, values = adapter.match()
            response = getattr(self, endpoint)(request, **values)
            return response(environ, start_response)
        except HTTPException as e:
            return e

    def server_html_file(self, file_name):
        html = open("templates/%s"%(file_name), 'r').read()
        return Response(html, mimetype='text/html')

    def index(self, request):
        return self.server_html_file('index.html')

    def simple_async_await(self, request):
        return self.server_html_file('index.html')

    def simple_promise(self, request):
        return self.server_html_file('index.html')

    def advance_async_await(self, request):
        return self.server_html_file('index.html')

    def advance_promise(self, request):
        return self.server_html_file('index.html')

def create_app():
    app = Application()
    app.dispatch = SharedDataMiddleware(
        app.dispatch, {"/static": os.path.join(os.path.dirname(__file__), "static")}
    )
    return app

if __name__ == "__main__":
    from werkzeug.serving import run_simple

    application = create_app()
    run_simple("127.0.0.1", 8000, application, use_debugger=True, use_reloader=True)