import datetime

from flask import (
    Blueprint, render_template, redirect, url_for, request, json, make_response
)

import app.service.nomrebi_api as api
from app.service.auth_helper import get_auth_data

bp = Blueprint('auth', __name__, url_prefix='/auth')


@bp.route('/', methods=['GET', 'POST'])
def index():
    """
    Authentication page.
    :return: The response.
    """

    if get_auth_data() is not None:
        return redirect(url_for('main.index'))

    if request.method == 'POST':
        if request.form['step'] == 'phone':
            authenticate = api.authenticate(request.form['phone'], request.form['resend'] == 'true')
            if authenticate['authenticated']:
                # If user is already authenticated on the API.
                return __make_auth_response(
                    request.form['phone'],
                    authenticate['data'],
                    url_for('main.index')
                )

            if 'error' in authenticate:
                return json.jsonify({'authenticated': False, 'error': authenticate['error']}), 400

            # If user is not authenticated and the SMS was sent.
            return json.jsonify({'authenticated': False, 'time': authenticate['data']['time']})
        elif request.form['step'] == 'code':
            authenticate = api.authenticate_with_sms_code(request.form['phone'], request.form['code'])
            if 'error' in authenticate:
                return json.jsonify({'error': authenticate['error']}), 400

            return __make_auth_response(
                request.form['phone'],
                authenticate['data'],
                url_for('main.index')
            )

    return render_template('auth.html')


@bp.route('/logout', methods=['GET'])
def logout():
    """
    Logout page.
    :return: The response.
    """

    response = make_response(redirect(url_for('auth.index')))
    response.delete_cookie('user_data')
    return response


def __make_auth_response(phone, auth_data, destination=None):
    """
    Create an authentication response and set cookies.
    :param phone: User's phone number.
    :param auth_data: The authentication credentials, such as User's phone, ID and the access token.
    :param destination: The redirect destination.
    :return: An authentication response.
    """

    response = make_response(json.jsonify({
        'authenticated': True,
        'destination': destination,
    }))
    user_data = {
        'phone': phone,
        'id': auth_data['id'],
        'token': auth_data['tk'],
    }

    response.set_cookie('user_data', json.dumps(user_data),
                        expires=datetime.datetime.now() + datetime.timedelta(days=14))

    return response
