import json
import requests

# API_BASE_URL = 'https://nomrebi-api.herokuapp.com/api'
API_BASE_URL = 'http://127.0.0.1:8080/api'


def authenticate(phone_number):
    response = requests.get(f'{API_BASE_URL}/authenticate/{phone_number}')
    return json.loads(response.content)


def authenticate_with_sms_code(phone_number, code):
    response = requests.get(f'{API_BASE_URL}/authenticate/{phone_number}/sms/{code}')
    return json.loads(response.content)


def get_number_info(phone_number, auth):
    response = requests.get(f'{API_BASE_URL}/number-info/{phone_number}',
                            params={'include_info': True, 'u_phone': auth['phone'], 'u_id': auth['id'],
                                    'u_token': auth['token']})
    return json.loads(response.content)
