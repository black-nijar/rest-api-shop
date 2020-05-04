# RESTful API SHOPPING - (Node.js,Express.js and MongoDB)
## run backend
npm install & npm start
## visit - <http://localhost:5000/products>
* **URL**

  ## user
  user register- `/user/signup`<br />
  user login- `/user/login`<br />
  
  ## products
  Create product- `/products`<br />
  Get all product- `/products`<br />
  Update product- `/products/:productId`<br />
  Delete product- `/products/:productId`<br />

  ## orders
  Get all order - `/orders`<br />
  New order - `/orders`<br />
  Get specfic order - `/orders/:orderId`<br />
  Delete order - `/orders/:orderId`<br />
  

* **Method:**

  `GET`
  `POST`
   `PATCH`
   `DELETE`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : 12, name : "Laptop", price: "35000" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User doesn't exist" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Auth failed" }`

