# dpaste

## Requirements

- Node.js
- MongoDB

## Usage

```sh
$ npm install # install dependencies
$ npm start   # run app at http://localhost:3001
```

## Maintenance

```sh
$ mkdir node_modules/mongodb/node_modules && cp -r node_modules/bson node_modules/mongodb/node_modules/bson
$ vi node_modules/mongodb/node_modules/bson/ext/index.js # only keep the `bson = require('../lib/bson/bson');` line
```

