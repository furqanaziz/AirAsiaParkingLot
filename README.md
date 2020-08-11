# AirAsiaParkingLot

This API is to enable an admin user to manage parking of a parking lot.

## Installation

CD to api folder and do

```bash
npm i
```
then do,
```bash
npm start
```
This should get this API up and running
## API

### Response Codes

200: Success
400: Bad request
401: Unauthorized
404: Cannot be found
405: Method not allowed
422: Unprocessable Entity 
50X: Server Error

### Login
* #### URL
    auth/login
* #### METHOD
    POST
* #### URL PARAMS
    None
* #### BODY
    ```
    { 
	"email": "furqan.aziz@gmail.com", // REQUIRED
	"password": "password", // REQUIRED
    }
* #### SUCCESS RESPONSE
    ```
    {
    "tokens": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYW1hYXJoYXNzYW5jc0BnbWFpbC5jb20ifSwiaWF0IjoxNTk3MDYzNzQwLCJleHAiOjE1OTczMjI5NDB9.9GbR6qXuWZYkTKkMPm2IfC0Oj302vSYmJNk2UvElBGU",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTcwNjM3NDAsImV4cCI6MTU5NzY2ODU0MH0.AQpEoCT9E0vSIqxYWnxMwht574xKHtqjpfI_ilQBsas"
    },
    "email": "furqan.aziz@gmail.com"
    }
* #### ERROR RESPONSE
    ```
    {
    "error": "Invalid credentials for user"
    }
    OR
    {
    "error": "Invalid password for the email"
    }
    OR
    {
    "success": false,
    "message": {
        "email": "\"email\" is required",
        "password": "\"password\" is required"
    }
    }
* #### SAMPLE CALL

## License
[MIT](https://choosealicense.com/licenses/mit/)