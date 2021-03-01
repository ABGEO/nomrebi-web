from flask import (
    Blueprint, send_from_directory, make_response
)


bp = Blueprint('pwa', __name__)


@bp.route('/manifest.json')
def manifest():
    return send_from_directory('static', 'manifest.json')


@bp.route('/service-worker.js')
def service_worker():
    response = make_response(send_from_directory('static', 'assets/js/service-worker.js'))
    response.headers['Cache-Control'] = 'no-cache'
    return response
