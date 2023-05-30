
## Task Board - Full Stack (MERN)

Task board helps us to easily manage the list and helps us to track the things easily.


## How to Setup project locally

1. visit the url : https://github.com/Arun-kumar-95/MERN-Task_board/tree/master

2. Download the zip file and open with your favourite editior

3. To install all the dependencies and packages : use npm install 

- npm install : for backend
- navigate to the client folder "cd client" command and install all the dependencies with "npm install" command

4. To start the backend server use "npm run dev"
5. To start the frontend server use "npm start"

## Frontend routes

 - http://localhost:3000 : here you can login and if you are authenticated will show the home page.


- http://localhost:3000/register : here you can register yourself

- You can logout from the logout button present inside the header and this will redirect it to the login page.


## Backend API routes 

server ul: http://localhost:5000/app/v1

1. USER ROUTES :

- register (POST):  /register 
- login (POST) : /login
- logout (GET) : /logout
- get user details (GET): /me

2. LIST ROUTES

url : http://localhost:5000/app/v1/list

- new list (POST) : /new-list
- add item (POST) : /add-item?list_id=listid
- delete item (DELETE): /remove-item/?item_id=itemid&list_id=listid
- get user list (GET) : /all-lists
- update item (PUT) : /update-item/itemid
- remove list (DELET) : /remove-list/listid
- update list item (PUT) : /update-list/?lid=oldlistid&drag_lid=newlidid

## Authors

- Arun kumar: https://github.com/Arun-kumar-95

 

