# Cyber Attacks Map

This project is an open-source webapp for display cyber-attacks in realtime.

## Demo

TBD

## Usage

The application exposes a REST API endpoint, which can be used for sending attack information.

### Starting the server:

```bash
node server
```

### Send an attack

```bash
curl -H "Content-Type: application/json" \
     -X POST \
     -d '{"originCoords": [40, -4], "originCountryName": "Spain", "destinationPort" : 22, "timestamp": "2015-04-20 16:13", "originCity": "Madrid", "originASN": "AS7786", "originOrganization": "Neustar", "originIP": "212.112.99.23"}' \
     http://localhost:3000/api/attack
```

Alternatively, you can use [utils/sender.js](utils/sender.js) script to feed with random data.

## Development and Deploy

View [docs](docs/docs.md).

## Acknowledgments

This web application is heavily inspired on [IPViking](http://map.ipviking.com/)

## License

MIT
