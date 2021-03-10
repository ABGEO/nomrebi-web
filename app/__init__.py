import datetime

from flask import (
    Flask, render_template, request,
)

from app.views import (
    auth, main, pwa
)

app = Flask(__name__)


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
    return render_template('error/404.html'), 404


app.register_blueprint(auth.bp)
app.register_blueprint(main.bp)
app.register_blueprint(pwa.bp)


def get_app():
    return app
