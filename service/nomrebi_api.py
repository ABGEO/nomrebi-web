import json
import requests

# API_BASE_URL = 'https://nomrebi-api.herokuapp.com/api'
API_BASE_URL = 'http://127.0.0.1:8080/api'


def authenticate(phone_number, resend=False):
    response = requests.post(f'{API_BASE_URL}/authenticate', json={'phone': phone_number, 'resend': resend})
    return json.loads(response.content)


def authenticate_with_sms_code(phone_number, code):
    response = requests.post(f'{API_BASE_URL}/authenticate/sms', json={'phone': phone_number, 'code': code})
    return json.loads(response.content)


def get_number_info(phone_number, auth):
    response = requests.get(f'{API_BASE_URL}/number-info/{phone_number}',
                            params={'include_info': True, 'u_phone': auth['phone'], 'u_id': auth['id'],
                                    'u_token': auth['token']})
    return json.loads(response.content) if response.status_code == 200 else {}
