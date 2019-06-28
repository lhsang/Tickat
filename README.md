# Tickat - Sell and buy tickets
>> NodeJS + PostgreSQL + Handlebars
## Developers.
|Full name                       | Student ID    |
|--------------------------------|---------------|
|Lê Hoàng Sang                   |1612554        |
|Đặng Thị Huyền Trâm             |1612719        |

## Demo
https://tickat.herokuapp.com

## Architecture.
1. Folder tree:

```
📦Root
 ┣ 📂bin
 ┣ 📂configs
 ┣ 📂controller
 ┃ ┣ 📂admin
 ┃ ┗ 📂customer
 ┣ 📂models
 ┣ 📂node_modules
 ┣ 📂public
 ┃ ┣ 📂css
 ┃ ┣ 📂img
 ┃ ┗ 📂js
 ┣ 📂routes
 ┣ 📂service
 ┣ 📂test_module
 ┣ 📂utils
 ┣ 📂views
 ┃ ┣ 📂admin
 ┃ ┣ 📂customer
 ┃ ┣ 📂error
 ┃ ┣ 📂layouts
 ┃ ┗ 📂partials
 ┣ 📜app.js
 ┣ 📜package-lock.json
 ┗ 📜package.json

```

2. Main architecture:

```
📦Root
 ┣ 📂controller
 ┣ 📂models
 ┣ 📂routes
 ┣ 📂service
 ┣ 📂views

```
* Models - The schema definition of the Model
* Routes - The API routes maps to the Controllers
* Controllers - The controllers handles all the logic behind validating request parameters, query, sending responses with correct codes.
* Services - The services contains the database queries and returning objects or throwing errors

## Usage

1. Get project

```
    $ git clone https://github.com/1612554/Tickat.git
```

2. Install package
```
    $ npm install
```

3. Run run
```
    $ npm start
```
>> Default port is 3000, so this app is available at: http://localhost:3000
