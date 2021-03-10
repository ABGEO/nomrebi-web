import datetime
import os

from flask import (
    Flask, render_template, request,
)

app = Flask(__name__)

app.config.from_object(os.environ['APP_SETTINGS'])


@app.context_processor
def inject_global_variables():
    """
    Define the global template variables.
    :return: The global variables.
    """

    return {
        'is_authenticated': request.cookies.get('access_token') is not None,
        'date': datetime.datetime.now()
    }


@app.errorhandler(404)
def page_not_found(e):
    return render_template('error/404.html.jinja2'), 404


from app.views import (
    auth, main, pwa
)

app.register_blueprint(auth.bp)
app.register_blueprint(main.bp)
app.register_blueprint(pwa.bp)
