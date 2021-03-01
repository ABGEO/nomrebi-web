import json

from flask import (
    request,
)


def get_auth_data():
    """
    Get the authentication data stored in cookies.
    :return: Authentication data or None.
    """

    user_data = request.cookies.get('user_data')
    return None if (user_data is None) else json.loads(user_data)
