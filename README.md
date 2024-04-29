# Data caching with Redis and MongoDB

[Sails v1](https://sailsjs.com)

## Introduction:

In this section we want to create a cache mechanism in Nodejs application written with sailsjs framework.
all developers can use it in their express code too.

Here is the structure of cache service:

![My Image](cacheDB.jpg)

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

  swagger Spec Endpoint : http://localhost:1337/dist/

  swagger-ui Endpoint : http://localhost:1337/dist/

# Swagger

## Specification

The swagger specification file is named as swagger.json. The file is located under definition folder.
swagger/swagger.json:

```
paths:
  /api/v1/user/signup:
    post:
      x-swagger-router-controller: UserController
      operationId: signup
      tags:
        - /api/v1/user/signup
      description: >-
        user signup
      parameters:
        - name: email
          in: query
          description: Name of greeting
          required: true
          type: string
        - name: username
          in: query
          description: Name of greeting
          required: true
          type: string
        - name: firstName
          in: query
          description: Name of greeting
          required: true
          type: string
        - name: lastName
          in: query
          description: Name of greeting
          required: true
          type: string
        - name: password
          in: query
          description: Name of greeting
          required: true
          type: string
      responses:
        '200':
          description: Successful request.
          schema:
            $ref: '#/components/schemas/user'
        default:
          description: Invalid request.

definitions:
  User:
    properties:
      firstName:
        type: string
      lastName:
        type: string
      email:
        type: string
      access_token:
        type: string
      refresh_token:
        type: string
    required:
      - access_token


### Links

- [Sails framework documentation](https://sailsjs.com/get-started)
- [Redis](https://redis.io/)
- [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
- [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
- [Community support options](https://sailsjs.com/support)
- [Professional / enterprise options](https://sailsjs.com/enterprise)

### Version info

This app was originally generated on Sun Feb 18 2024 11:25:40 GMT+0330 (Iran Standard Time) using Sails v1.5.9.

## Author

- [Mahsa Ghazi](https://github.com/mahsa70)
```

#   d a t a C a c h i n g 
 
 
