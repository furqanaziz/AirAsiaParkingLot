## API DOCS

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
### Logout
* #### URL
    auth/logout
* #### METHOD
    POST
* #### URL PARAMS
    None
* #### BODY
    None
* #### SUCCESS RESPONSE
    ```
    {
      "message": "logout successfull"
    }
    OR
    {
      "messaage": "user already logged out"
    }
* #### ERROR RESPONSE
    ```
    {
        "error": "Could not logout user"
     }
### Available slots
* #### URL
    parking/available
* #### METHOD
    GET
* #### URL PARAMS
    None
* #### BODY
    None
* #### HEADERS
    Authorization: Bearer {{Token}}
* #### SUCCESS RESPONSE
    ```
    [
        {
            "id": "5",
            "car": null,
            "alloted": false
        },
        {
            "id": "6",
            "alloted": false,
            "car": null
        }
    ]
* #### ERROR RESPONSE
    ```
    {
        "error": "Could not get available spots"
    }
### Count of Available slots
* #### URL
    parking/available/count
* #### METHOD
    GET
* #### URL PARAMS
    None
* #### BODY
    None
* #### HEADERS
    Authorization: Bearer {{Token}}
* #### SUCCESS RESPONSE
    ```
    {
        "count": 120
    }
* #### ERROR RESPONSE
    ```
    {
        "error": "Could not get available spots"
    }
### Get car by Type or Number
This API supports to filter parked cars based on any of their fields e.g. type, number, color
* #### URL
    parking/:field/:value
* #### METHOD
    GET
* #### URL PARAMS
    field, value
    *field : type / number / color*
    *value : Sedan / LEB 07 619 / black*
* #### BODY
    None
* #### HEADERS
    Authorization: Bearer {{Token}}
* #### SUCCESS RESPONSE
    ```
    [
        {
            "color": "black",
            "number": "LEB 03 619",
            "type": "Sedan"
        }
    ]
* #### ERROR RESPONSE
    ```
    {
        "error": "No such car in the parking"
    }
    OR
    {
        "error": "Required field to query and its value in params"
    }
### Park a Car
* #### URL
    parking/park
* #### METHOD
    POST
* #### URL PARAMS
    None
* #### BODY
    ```
    {
    	"number": "LEC 12 2738",
    	"color": "white",
    	"type": "Suv"
    }
* #### HEADERS
    Authorization: Bearer {{Token}}
* #### SUCCESS RESPONSE
    ```
    {
        "id": "5"   // slot id
    }
* #### ERROR RESPONSE
    ```
    {
        "error": "Car already parked"       // for same number
    }
    OR
    {
        "error": "All slots filled"         // in case there is no free slot
    }
    {
        "success": false,
        "message": {
            "number": "\"number\" is required",
            "color": "\"color\" is required",
            "type": "\"type\" is required"
        }
    }
### UnPark a Car
This API takes in slot id, un parks a car if there is one and then returns the car details which was unparked.
* #### URL
    parking/unpark/:id
* #### METHOD
    POST
* #### URL PARAMS
    id (slot id as returned at the time of parking)
* #### BODY
    None
* #### HEADERS
    Authorization: Bearer {{Token}}
* #### SUCCESS RESPONSE
    ```
    {
        "car": {
            "color": "pink",
            "number": "LEC 17 2738",
            "type": "Sedan"
        }
    }
* #### ERROR RESPONSE
    ```
    {
        "error": "Required slot id in params"
    }
    OR
    {
        "error": "No such slot in the parking"  // for wrong id
    }
