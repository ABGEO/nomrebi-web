import json
import requests

from app import app

API_BASE_URL = app.config['API_BASE_URL']


def authenticate(phone_number, resend=False):
    """
    Send an authentication request to the API.
    :param phone_number: Phone number to authenticate.
    :param resend: Resend SMS code.
    :return: The API response.
    """

    response = requests.post(f'{API_BASE_URL}/authenticate', json={'phone': phone_number, 'resend': resend})
    return json.loads(response.content)


def authenticate_with_sms_code(phone_number, code):
    """
    Send an authentication request to the API SMS Code verification.
    :param phone_number: Phone number to authenticate.
    :param code: SMS Code.
    :return: The API response.
    """

    response = requests.post(f'{API_BASE_URL}/authenticate/sms', json={'phone': phone_number, 'code': code})
    return json.loads(response.content)


def get_number_info(phone_number, access_token):
    """
    Get the information about given number.
    :param phone_number: Get information for.
    :param access_token: Access Token.
    :return: The API response or an empty object.
    """

    response = requests.get(f'{API_BASE_URL}/number-info/{phone_number}',
                            headers={'Authorization': f'Bearer {access_token}'})

    result = {}
    try:
        result = json.loads(response.content)
    except:
        pass

    return result, response.status_code
