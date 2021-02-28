import datetime

from flask import (
    Flask,
    render_template,
    make_response,
    redirect,
    url_for,
    request,
    json,
)

import service.nomrebi_api as api

app = Flask(__name__)


@app.context_processor
def inject_global_variables():
    return {
        'user': __get_auth_data(),
        'date': datetime.datetime.now()
    }


@app.route('/', methods=['GET', 'POST'])
def index():
    if __get_auth_data() is None:
        return redirect(url_for('auth'))

    if request.method == 'POST':
        return json.jsonify(api.get_number_info(request.form['phone'], __get_auth_data()))

    return render_template('index.html')


@app.route('/auth', methods=['GET', 'POST'])
def auth():
    if __get_auth_data() is not None:
        return redirect(url_for('index'))

    if request.method == 'POST':
        if request.form['step'] == 'phone':
            authenticate = api.authenticate(request.form['phone'])
            if authenticate['authenticated']:
                # If user is already authenticated on the API.
                return __make_auth_response(
                    request.form['phone'],
                    authenticate['data'],
                    url_for('index')
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
                url_for('index')
            )

    return render_template('auth.html')


@app.route('/logout', methods=['GET'])
def logout():
    response = make_response(redirect(url_for('auth')))
    response.delete_cookie('user_data')
    return response


def __get_auth_data():
    user_data = request.cookies.get('user_data')
    return None if (user_data is None) else json.loads(user_data)


def __make_auth_response(phone, auth_data, destination=None):
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


if __name__ == '__main__':
    app.run()