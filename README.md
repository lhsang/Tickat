# Tickat - Sell and buy tickets

## Developer
|Full name                       | Student ID    |
|--------------------------------|---------------|
|Lê Hoàng Sang                   |1612554        |
|Đặng Thị Huyền Trâm             |1612719        |

## Architecture
1. Folder tree:

```
📦Root
 ┣ 📂bin
 ┃ ┗ 📜www
 ┣ 📂configs
 ┃ ┣ 📜db.js
 ┣ 📂controller
 ┃ ┣ 📂admin
 ┃ ┗ 📂customer
 ┃ ┃ ┗ 📜homeController.js
 ┣ 📂models
 ┃ ┣ 📜account.js
 ┣ 📂node_modules
 ┣ 📂public
 ┃ ┣ 📂css
 ┃ ┣ 📂img
 ┃ ┗ 📂js
 ┣ 📂routes
 ┃ ┗ 📜index.js
 ┣ 📂service
 ┃ ┗ 📜userService.js
 ┣ 📂test_module
 ┃ ┗ 📜test.js
 ┣ 📂utils
 ┃ ┣ 📜bcrypt.js
 ┣ 📂views
 ┃ ┣ 📂admin
 ┃ ┃ ┣ 📜dashboard.handlebars
 ┃ ┣ 📂customer
 ┃ ┃ ┗ 📜home.handlebars
 ┃ ┣ 📂error
 ┃ ┃ ┗ 📜upload.handlebars
 ┃ ┣ 📂layouts
 ┃ ┃ ┣ 📜main.handlebars
 ┃ ┗ 📂partials
 ┃ ┃ ┣ 📜footer.handlebars
 ┃ ┃ ┣ 📜header.handlebars
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