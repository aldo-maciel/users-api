# users-api
### Models
- **User**
   - **login**: String
   - **id**: Number
   - **html_url**: String
   - **created_at**: String
       
- **Repo**
    - **id**: Number
    - **name**: String
    - **html_url**: String
   
### Route
base: /api/v1/
- **User**
  - public
    - **/users** - GET - find paginate users
    - **/users/:username/details** - GET - find user by username 
    - **/users/:username/repos** - GET - find all user repos by username 
---
### Environment variables
|   Variable     | Description         |  default      |
| -------------  | :------------------ | ------------: |
| PORT           | Server port         |  3001         |
| LOG_LEVEL      | Level to print logs |  INFO ([log4js](https://www.npmjs.com/package/log4js))|
| LOG_DAYS       | Days to keep logs   |  15           |
| LOG_PATH       | path to save logs   |  logs/        |
| USERS_URL      | user external url   |  ?            |
---
### Main technologies

- typescript@3.8.3
- node@12.16.1
- express@4.17.1
- mocha@7.1.1

---

PS: It's needed to send environment variable `PORT` when run test by other way that not by `npm test` when server 
is running, default port for tests is the of the same as the server port
