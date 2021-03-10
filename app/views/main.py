from flask import (
    Blueprint, render_template, redirect, url_for, request, json
)

import app.service.nomrebi_api as api

bp = Blueprint('main', __name__)


@bp.route('/', methods=['GET', 'POST'])
def index():
    """
    Search page.
    :return: The response.
    """

    access_token = request.cookies.get('access_token')
    if access_token is None:
        return redirect(url_for('auth.index'))

    if request.method == 'POST':
        response, code = api.get_number_info(request.form['phone'], access_token)

        return json.jsonify(response), code

    return render_template('index.html')


@bp.route('/about', methods=['GET'])
def about():
    """
    About page.
    :return: The response.
    """

    return render_template('about.html')
