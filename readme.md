# Users API
The app uses 
1. Prisma as the ORM
2. Express as the HTTP package
3. PostgreSQL as the Database

The base URL http://127.0.0.1

The app has two endpoints, which are:
1. Create new user POST /api/v1/users


Request Sample:

```
{
    "email": "example@gmail.com",
    "password": "@Giant9_2022"
}
```

Response Sample:

```
{
    "status": "success",
    "message": "Registration successful.",
    "data": {
        "userId": 1,
        "email": "example@gmail.com",
        "createdTimestamp": "2023-01-03T09:52:52.486Z",
        "updatedTimestamp": "2023-01-03T09:52:52.486Z"
    }
}
```

2. Retrieve all users GET /api/v1/users


Response Sample:

```
{
    "status": "success",
    "message": "Records retrieved.",
    "data": [
        {
            "userId": 1,
            "email": "okunlolatopman14@gmail.com",
            "createdTimestamp": "2023-01-03T07:52:44.151Z",
            "updatedTimestamp": "2023-01-03T07:52:44.151Z"
        },
        {
            "userId": 2,
            "email": "example@gmail.com",
            "createdTimestamp": "2023-01-03T09:52:52.486Z",
            "updatedTimestamp": "2023-01-03T09:52:52.486Z"
        }
    ]
}
```

## Getting Started

### Basic Requirements
- Docker
- Postgresql
- NodeJS

### Clone and install dependencies
Clone this repository:

` git clone git@github.com:OTopman/users-api.git`

Install npm dependencies:

```
cd users-api
npm install
```
## To Run 
```
docker-compose up
```
