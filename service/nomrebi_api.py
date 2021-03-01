import json
import requests

API_BASE_URL = 'https://nomrebi-api.herokuapp.com/api'


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


def get_number_info(phone_number, auth):
    """
    Get the information about given number.
    :param phone_number: Get information for.
    :param auth: The authentication credentials, such as User's phone, ID and the access token.
    :return: The API response or an empty object.
    """

    response = requests.get(f'{API_BASE_URL}/number-info/{phone_number}',
                            params={'u_phone': auth['phone'], 'u_id': auth['id'], 'u_token': auth['token']})
    return json.loads(response.content) if response.status_code == 200 else {}
