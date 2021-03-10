# nomrebi-web

Get information about phone numbers stored in the Nomrebi.com database

[![GitHub release](https://img.shields.io/github/release/ABGEO/nomrebi-web.svg)](https://github.com/ABGEO/nomrebi-web/releases)
[![GitHub license](https://img.shields.io/github/license/ABGEO/nomrebi-web.svg)](https://github.com/ABGEO/nomrebi-web/blob/1.x/LICENSE)

See project at [nomrebi.abgeo.dev](https://nomrebi.abgeo.dev/).

## Installation

Install dependencies using [PIP](https://pypi.org/):

- `pip install -r requirements.txt`

## Usage

### Run Flaks development server

`APP_SETTINGS=config.DevelopmentConfig FLASK_APP=index.py FLASK_ENV=development flask run --port 5000`

### Run production WSGI server

`APP_SETTINGS=config.ProductionConfig waitress-serve --port=5000 app:app`

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for details.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Authors

- [**Temuri Takalandze**](https://abgeo.dev) - *Initial work*

## License

Copyright © 2021 [Temuri Takalandze](https://abgeo.dev).  
Released under the [MIT](LICENSE) license.
