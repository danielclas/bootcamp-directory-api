# Bootcamp Directory API

>Backend API for Bootcamp Directory application

![Node](https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white) ![JS](https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?&style=for-the-badge&logo=mongodb&logoColor=white) ![Express badge](https://img.shields.io/badge/express.js%20-%23404d59.svg?&style=for-the-badge) ![VS](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?&style=for-the-badge&logo=visual-studio-code&logoColor=white) ![Heroku](https://img.shields.io/badge/heroku%20-%23430098.svg?&style=for-the-badge&logo=heroku&logoColor=white)

See the documentation [here](www.google.com)

## Features
* RESTful API built with Node.js, Express, and MongoDB
* Authentication with JWT and cookies
* Register, login, and logout functionalities, with password/token hashing, and reset of password via email.
* Geocoding for getting resources within a distance of a ZIP code
* Photo upload
* Custom error handling
* Custom middleware for advanced filtering on queries (pagination, sorting, field selection, etc.)
* Database seeder for quick data importing and deleting
## Usage
Rename "config/config.env.env" to "config/config.env" and update the values/settings to your own

## Install dependencies
```
npm install
```

## Seed the DB
Use seeder.js to populate or empty the DB
```
# Seed the DB
node seeder -i

# Empty the DB
node seeder -d
```

## Run App
```
# Run in dev mode
npm run dev

# Run in prod mode
npm start
```

### Version 1.0.0