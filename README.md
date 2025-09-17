# NOTE: This is still a work in progress.

A forked modification of [Express'](https://www.npmjs.com/package/express) application generator.

# Changes from the Base Express Generator

This version exists to only return JSON data, not any views.
Additionally, this is configured to use the ME_N stack:
- Mongo
- Express
- Node

Mongoose will be installed in the base generation.

# Token Verification

The generator will use `jsonwebtoken` for validation, as opposed to sessions

Create the backend:

```bash
$ npm run go
```

NOTE: This will create an Express app inside the generator. This is only temporary.

Enter the app:

```bash
$ cd backend
```

Install dependencies:

```bash
$ npm install
```

Start your Express.js app at `http://localhost:3000/`:

```bash
$ npm start
```

For continuous updating with `nodemon`

```bash
$ npm run dev
```

# Future changes to make

### Changes for base version

- Remove all basal View cruft
- Connect to MongoDb via command-line input
- Generate via command line:
    - Model folder
    - Middleware folder
    - Basic token auth middleware
    - Token-creation method
    - Basic User model
    - Protected route proof-of-concept

### Extended desirable features

- Generate package.json dependency versions based on the user's active Node version
- Create routes via command line
- Create models via command line
- Connect to a git repository via command-line input

### Very far down the road

- Typescript compatibility

## License

[MIT](LICENSE)
