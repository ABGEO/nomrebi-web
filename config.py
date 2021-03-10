import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    SECRET_KEY = 'this-really-needs-to-be-changed'
    API_BASE_URL = 'https://nomrebi-api.herokuapp.com/api'


class ProductionConfig(Config):
    DEBUG = False


class StagingConfig(Config):
    DEVELOPMENT = True
    DEBUG = True
    API_BASE_URL = 'https://nomrebi-api-stg.herokuapp.com/api'


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True
    API_BASE_URL = 'http://127.0.0.1:8000/api'


class TestingConfig(Config):
    TESTING = True


del os
