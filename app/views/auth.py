import datetime

from flask import (
    Blueprint, render_template, redirect, url_for, request, json, make_response
)

import app.service.nomrebi_api as api

bp = Blueprint('auth', __name__, url_prefix='/auth')


@bp.route('/', methods=['GET', 'POST'])
def index():
    """
    Authentication page.
    :return: The response.
    """

    if request.cookies.get('access_token') is not None:
        return redirect(url_for('main.index'))

    if request.method == 'POST':
        if request.form['step'] == 'phone':
            authenticate = api.authenticate(request.form['phone'], request.form['resend'] == 'true')
            if authenticate['authenticated']:
                # If user is already authenticated on the API.
                return __make_auth_response(
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
    response.delete_cookie('access_token')
    return response


def __make_auth_response(access_token, destination=None):
    """
    Create an authentication response and set cookies.
    :param access_token: Access token with expiration date.
    :param destination: The redirect destination.
    :return: An authentication response.
    """

    response = make_response(json.jsonify({
        'authenticated': True,
        'destination': destination,
    }))

    response.set_cookie('access_token', access_token['token'], expires=access_token['expires'])

    return response
