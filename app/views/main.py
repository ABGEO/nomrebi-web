from flask import (
    Blueprint, render_template, redirect, url_for, request, json
)

import app.service.nomrebi_api as api
from app.service.auth_helper import get_auth_data

bp = Blueprint('main', __name__)


@bp.route('/', methods=['GET', 'POST'])
def index():
    """
    Search page.
    :return: The response.
    """

    auth_data = get_auth_data()
    if auth_data is None:
        return redirect(url_for('auth.index'))

    if request.method == 'POST':
        return json.jsonify(api.get_number_info(request.form['phone'], auth_data))

    return render_template('index.html')


@bp.route('/about', methods=['GET'])
def about():
    """
    About page.
    :return: The response.
    """

    return render_template('about.html')
