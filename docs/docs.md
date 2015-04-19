## API Endpoint

Endpoint: **/api/attack**
Method: **POST**
Content-Type: **application/json**

Example body:
```
{
  "originCoords": [
      40,
      -4
  ],
  "originCountryName": "Spain",
  "destinationPort": 1234,
  "timestamp": "2015-04-20 17:12",
  "originCity": "Madrid",
  "originASN": "AS1234",
  "originOrganization": "CompuGlobalHyperMegaNET",
  "originIP": "123.123.123.123"
}
```

Of course, you can extend this to suite your needs.

## Development

This is an **ExpressJS** application, which uses **Stylus** and **Browserify** as middleware in order to speed up development time.

The server is a simple file which broadcasts attacks to clients through **Socket.IO**.

On the client side, this applicaation uses **Backbone** to provide some structure, with **Handlebars** templates. For the map and graphic stuff **D3** is used, and **Socket.IO** for realtime event sending.

There are 4 views:
  - Map
  - Log
  - Top countries
  - Top ports

Each view has it's own model and stylus file. The models are notified when a socket event happens.

If you want to change colors, fonts etc. view [variables.styl](public/styles/base/variables.styl).

### Extending

TBD

### Tests

TBD

## Deploy and production environments

As it is a work in progress, many improvements can be made in order to serve this application in production, including:

  - Building an optimized version of static files.
  - Disable unnecesary middlewares and serve static files with a dedicated server.

Please be aware that **no security controls are implemented in this version**
