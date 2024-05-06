# Data caching with Redis and MongoDB

## Introduction:

In this section, we aim to create a cache mechanism in a Node.js application written with the Sails.js framework.

All developers can utilize this mechanism in their Express code as well.

Here is the structure of the cache service:

![My Image](cacheDB.jpg)

# Environment vars

This project uses the following environment variables:

| Name                 | Description          | Default Value                      |
| -------------------- | -------------------- | ---------------------------------- |
| REDIS_URL            | redisDB url          | "127.0.0.1:6379"                   |
| Mongo_URL            | MongoDB url          | " mongodb://127.0.0.1:27017/dbApp" |
| JWT_ALGORITHM        | jwt algorithm        | "RS256"                            |
| REFRESH_TOKEN_SECRET | refresh token secret | "??????????????"                   |

# Pre-requisites

- Install [Node.js](https://nodejs.org/en/)
- Install [Redis](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-22-04)
- Install [MongoDB](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/)

# Getting started

- Clone the repository

```
git clone  https://github.com/mahsa70/dataCaching.git
```

- Install dependencies

```
cd dataCaching
npm install
```

- Build and run the project

```
npm start
```

Navigate to `http://localhost:1337`

- API Document endpoints

  swagger Endpoint : http://localhost:1337/dist/

### Links

- [Sails framework documentation](https://sailsjs.com/get-started)
- [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
- [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
- [Community support options](https://sailsjs.com/support)
- [Professional / enterprise options](https://sailsjs.com/enterprise)

### Version info

This app was originally generated on Fri Apr 08 2023 22:26:09 GMT+0430 (Iran Daylight Time) using Sails v1.4.0.

## Author

- [Mahsa Ghazi](https://github.com/mahsa70)
