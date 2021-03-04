Criteria:

1. CSM
2. REST API
3. 3 API => Gmaps (API key), Open Weather,
4. authentication & authorization (login + register)
5. 3rd API login
6. client side (HTML - CSS - jQuery)
7. menggunakan git hub

Pembagian Tugas:

-   ngerjain dokumentasi (together)
-   ngerjain inisiasi awal (josh)
-   ngerjain crud + middleware + helpers + nambah semua kebutuhan di app.js (cors, err.handler, dsb.) (josh,denny,naufal)
-   3rd API (denny : gmaps & 3rd api, naufal : open weather)
-   ngerjain layouting page dengan framework (html) (Anggi)
-   ngerjain jquery + ajax (anggi, and team)

Tema:

Foto-foto destinasi Indonesia

===============================================================

ENDPOINT:

1. `POST /login`
2. `POST /register`
3. `GET /destination`
4. `GET /destination/one`
5. `GET /weather`

Flow:

-   login / register
-   user ngeliat location recommendationnya plus semua 3rd api
-   user juga bisa ngeliat all location (10 lokasi di indonesia)

## 1. `POST /login`

Description =
User login with email and password

Request =

not needed

-   body =

        ```json
        {
          "email": "<email>",
          "password": "<password>"
        }
        ```

    Response (200 - OK) =

```json
{
    "id": "<id>",
    "email": "<email>",
    "access_token": "<access token>"
}
```

Response (401 - not authorized)

```json
{
    "message": "<email / password is wrong message>"
}
```

Response (500 - Internal Server Error)

```json
{
    "message": "<internal server Error message>"
}
```

## 2. `POST /register`

Description =
new User can register with unique email and their password

Request =

-   headers =
    not needed

-   body =

    ```json
    {
        "email": "<email>",
        "password": "<password>"
    }
    ```

Response (201 - CREATED) =

```json
{
    "id": "<id>",
    "email": "<email by user>"
}
```

Response (401 - not authorized) =

```json
{
    "message": "<bad request message>"
}
```

Response (500 - Internal Server Error)

```json
{
    "message": "<internal server Error message>"
}
```

## 3. `GET /destination`

Description =

User can get list of all the destination

Request =

-   headers =

    {
    "access_token": "<access token>"
    }

-   body =

    not needed

Response (200 - OK) =

```json
{
    "id": "<given id by system>",
    "title": "<destination title>",
    "description": "<destination description>",
    "imgURL": "<image URL>",
    "createdAt": "<date by system>",
    "updatedAt": "<date by system>"
}
```

Response (404 - NOT FOUND) =

```json
{
    "message": "<Not Found message>"
}
```

Response (500 - internal server error) =

```json
{
    "message": "<internal server error message>"
}
```

## 4. GET /destination/one

Description =

User can get one destination randomly

Request =

-   headers =

    {
    "access_token": "<access token>"
    }

-   body =

    not needed

Response (200 - OK) =

```json
{
    "id": "<given id by system>",
    "title": "<destination title>",
    "description": "<destination description>",
    "imgURL": "<image URL>",
    "createdAt": "<date by system>",
    "updatedAt": "<date by system>"
}
```

Response (404 - NOT FOUND) =

```json
{
    "message": "<Not Found message>"
}
```

Response (500 - internal server error) =

```json
{
    "message": "<internal server error message>"
}
```

## 5. GET /weather`

Description =

3rd api for weather

Request =

-   headers =

    {
    "access_token": "<access token>"
    }

-   body =

    {
    "title": "<todos title>",
    "description": "<todos description>",
    "status": "<todos status>",
    "due_date": "<todos due_date>"
    }

Response (200 - OK) =

{
"weather": [
{
"id": "<id>",
"main": "<status weather>",
"description": "<weather description>",
"icon": "<imgid>"
}
],
"base": "stations",
"main": {
"temp": "<temp>",
"pressure": "<pressure>",
},
"name": "<location name>"
}

Response (401 - Not Authorized) =

```json
{
    "message": "<not authorized message>"
}
```

Response (500 - INTERNAL SERVER ERROR) =

```json
{
    "message": "<internal server message>"
}
```
