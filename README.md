# Project Name

<br>

## Description

This is an app to democratize plants and flowers delivery, by connecting customers and shops with independent drivers.

MVP: Customer, stores, GPS (filter by near By)

- Add driver only if there's time

<!-- -  **404:** As a user I get to see a 404 page with a feedback message if I try to reach a page that does not exist so that I know it's my fault.
-  **Signup:** As an anonymous user I can sign up on the platform so that I can start creating and managing tournaments.
-  **Login:** As a user I can login to the platform so that I can access my profile and start creating and managing tournaments.
-  **Logout:** As a logged in user I can logout from the platform so no one else can use it.
-  **Profile Page**: As a logged in user I can visit my profile page so that I can access the edit page and see the list of tournaments I have created.
-  **Add Tournaments:** As a logged in user I can access the add tournament page so that I can create a new tournament.
-  **Edit Tournaments:** As a logged in user I can access the edit tournament page so that I can edit the tournament I created.
-  **Add Players:** As a user I can add players to a tournament.
-  **View Tournament Table:** As a user I want to see the tournament details, players list and the time table.
-  **View Ranks:** As a user I can see the rankings list for the tournament. -->

# Client / Frontend

## React Router Routes (React App)

| Path                        | Page/Component     | Permissions                 | Behavior                                          |
| --------------------------- | ------------------ | --------------------------- | ------------------------------------------------- |
| `/login`                    | Login              | anon only `<AnonRoute>`     | Login form, navigates to home page after login.   |
| `/signup`                   | Signup             | anon only `<AnonRoute>`     | Signup form, navigates to home page after signup. |
| `/`                         | HomePage           | public `<Route>`            | Home page.                                        |
| `/user-profile`             | ProfilePage        | user only `<PrivateRoute>`  | User and player profile for the current user.     |
| `/user-profile/edit`        | EditProfile        | user only `<PrivateRoute>`  | Edit user profile form.                           |
| `/stores/add`               | AddStore           | admin only `<PrivateRoute>` | Create new store form.                            |
| `/stores`                   | ListStores         | user only `<PrivateRoute>`  | Stores list.                                      |
| `/stores/:storeId`          | StoreDetail        | user only `<PrivateRoute>`  | Store details. Shows products list .              |
| `/stores/:storeId/edit`     | EditStoreDetail    | admin only `<PrivateRoute>` | Update store details, add products                |
| `/stores/:storeId/checkout` | StoreCheckout      | user only `<PrivateRoute>`  | Show list of products added to cart               |
| `/stores/:productId`        | ProductDetails     | user only `<PrivateRoute>`  | Shows details of the product                      |
| `/stores/:productId/edit`   | EditProductDetails | admin only `<PrivateRoute>` | Shows details of the product                      |
| `/orders/:storeId`          | ListStoreOrders    | user only `<PrivateRoute>`  | Returns all orders received by the store          |
| `/orders/:userId`           | ListUserOrders     | user only `<PrivateRoute>`  | Returns all orders placed by the user.            |

## Pages

### Auth Pages

- LoginPage

- SignupPage

### Client Pages

- HomePage

- ProfilePage

- EditProfilePage

- List Stores

- Store details

- My orders

### Store Pages

- My Store

- Edit Store

- Add product/ad to sell

- Edit product/ad

- My Store orders

### Driver Pages

- LoginPage

- SignupPage

- ProfilePage

- EditProfilePage

- List of orders to deliver

- My deliveries

## Components:

- Navbar

- User profile card

- Product/Ad card

- Add Product/Ad card

- Order Card

- Is Private

- Is Anon

- Is Admin

# Server / Backend

## Models

**User model**

```javascript
{
  email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    isDriver:{type: Boolean}
}
```

**Store model**

```javascript
{
  name: { type: String, required: true },
  img: { type: String },
  admin: { type: Schema.Types.ObjectId, ref:'User' },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
}
```

**Product Model**

```javascript
{
  name: { type: String, required: true },
  img: { type: String },
  store: { type: Schema.Types.ObjectId, ref:'Store', required: true },
  price: {type : Number, required: true},
  stock: { type: Number }

}
```

**Order model**

```javascript
{
  store: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required : true },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product', required :true },]
  status: {type: String, enum: ['new', 'preparing', 'ready', 'delivering', 'delivered', 'canceled'], required :true},
  total: {type: Number}
}
```

<br>

## API Endpoints (backend routes)

### Auth

| HTTP Method | URL            | Request Body            | Success status | Error Status | Description                                                                                                                     |
| ----------- | -------------- | ----------------------- | -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| POST        | `/auth/signup` | {name, email, password} | 200            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`  | {username, password}    | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session              |
| GET         | `/auth/verify` |                         |                |              | Verifies the JWT                                                                                                                |

### Client

| HTTP Method | URL             | Request Body                             | Success status | Error Status | Description                         |
| ----------- | --------------- | ---------------------------------------- | -------------- | ------------ | ----------------------------------- |
| GET         | `/api/user/:id` |                                          |                |              | show the customer profile details   |
| PUT         | `/api/user/:id` | { name, img, location, store, isDriver } | 200            | 404          | Update the customer profile details |

### Stores

| HTTP Method | URL               | Request Body                           | Success status | Error Status | Description                 |
| ----------- | ----------------- | -------------------------------------- | -------------- | ------------ | --------------------------- |
| GET         | `/api/stores`     |                                        |                | 400          | Show all available stores   |
| GET         | `/api/stores/:id` |                                        |                |              | Show specific store         |
| POST        | `/api/stores`     | { name, img, address, admin }          |                | 400          | Create and save a new store |
| PUT         | `/api/stores/:id` | { name, img,address, products, admin } | 200            | 400          | edit the store              |
| DELETE      | `/api/stores/:id` |                                        | 201            | 400          | delete store                |

### Products

| HTTP Method | URL                        | Request Body                       | Success status | Error Status | Description               |
| ----------- | -------------------------- | ---------------------------------- | -------------- | ------------ | ------------------------- |
| GET         | `/api/products/:productId` |                                    |                |              | List details of a product |
| POST        | `/api/products/`           | {name, img, store, price quantity} |                |              | Create a Product          |
| PUT         | `/api/products/:productId` | {name, img, store, price quantity} |                |              | update a Product          |
| Delete      | `/api/products/:productId` |                                    |                |              | Delete a Product          |

### Orders

| HTTP Method | URL                        | Request Body                           | Success status | Error Status | Description                   |
| ----------- | -------------------------- | -------------------------------------- | -------------- | ------------ | ----------------------------- |
| GET         | `/api/orders/:id`          |                                        |                |              | List details of an order      |
| GET         | `/api/orders/user/:userId` |                                        |                |              | Get all orders for given user |
| POST        | `/api/orders`              | {products, user, store, status, total} |                |              | Place an order                |
| PUT         | `/api/orders/:id`          | {status}                               |                |              | Update an order status        |
| DELETE      | `/api/orders/:id`          |                                        |                |              | Delete an order               |

### Driver

| HTTP Method | URL                  | Request Body            | Success status | Error Status | Description                          |
| ----------- | -------------------- | ----------------------- | -------------- | ------------ | ------------------------------------ |
| GET         | `/api/driver`        |                         |                | 400          | show driver profile details          |
| PUT         | `/api/driver/:id`    | { name, img, location } | 200            | 404          | Update the driver profile details    |
| POST        | `/api/driver/`       | { name, img, location } | 200            | 404          | Create Driver account                |
| GET         | `/api/driver/orders` |                         |                |              | List all orders ready for delivering |

<br>

## API's

<br>

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/xIR9t7e0/plant-delivery) or a picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/pedro-louro/green-bridge-client)

[Server repository Link](https://github.com/pedro-louro/green-bridge-server)

[Deployed App Link](http://heroku.com)

### Slides

[Slides Link](http://slides.com) - The url to your _public_ presentation slides

### Contributors

FirstName LastName - <github-username> - <linkedin-profile-link>

FirstName LastName - <github-username> - <linkedin-profile-link>
