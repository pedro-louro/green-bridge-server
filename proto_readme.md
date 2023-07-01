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

<!-- | Path                         | Component            | Permissions                | Behavior                                                  |
| ---------------------------- | -------------------- | -------------------------- | --------------------------------------------------------- |
| `/login`                     | LoginPage            | anon only `<AnonRoute>`    | Login form, navigates to home page after login.           |
| `/signup`                    | SignupPage           | anon only `<AnonRoute>`    | Signup form, navigates to home page after signup.         |
| `/`                          | HomePage             | public `<Route>`           | Home page.                                                |
| `/user-profile`              | ProfilePage          | user only `<PrivateRoute>` | User and player profile for the current user.             |
| `/user-profile/edit`         | EditProfilePage      | user only `<PrivateRoute>` | Edit user profile form.                                   |
| `/tournaments/add`           | CreateTournamentPage | user only `<PrivateRoute>` | Create new tournament form.                               |
| `/tournaments`               | TournamentListPage   | user only `<PrivateRoute>` | Tournaments list.                                         |
| `/tournaments/:tournamentId` | TournamentDetailPage | user only `<PrivateRoute>` | Tournament details. Shows players list and other details. |
| `/tournament/players/:id`    | PlayerDetailsPage    | user only `<PrivateRoute>` | Single player details.                                    |
| `/rankings/:tournamentId`    | RankingsPage         | user only `<PrivateRoute>` | Tournament rankings list.                                 | -->

## Components

Pages:

- LoginPage

- SignupPage

- HomePage

- ProfilePage

- EditProfilePage

<!-- - CreateTournamentPage

- TournamentListPage

- TournamentDetailsPage

- PlayerDetailsPage

- RankingsPage -->

Components:

<!-- - PlayerCard
- TournamentCard
- Navbar -->

# Server / Backend

## Models

**User model**

```javascript
{
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
	playerProfile: { type: Schema.Types.ObjectId, ref:'Player' },
  createdTournaments: [ { type: Schema.Types.ObjectId, ref:'Tournament' } ]
}
```

<!-- **Tournament model**

```javascript
 {
   name: { type: String, required: true },
   img: { type: String },
   players: [ { type: Schema.Types.ObjectId, ref:'Player' } ],
   games: [],
   rankings: []
 }
```

**Player model**

```javascript
{
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  profileImage: { type: String },
  scores: []
}
``` -->

<br>

## API Endpoints (backend routes)

### Auth

| HTTP Method | URL            | Request Body            | Success status | Error Status | Description                                                                                                                     |
| ----------- | -------------- | ----------------------- | -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| POST        | `/auth/signup` | {name, email, password} | 200            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`  | {username, password}    | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session              |

### Stores

| HTTP Method | URL                      | Request Body                      | Success status | Error Status | Description                   |
| ----------- | ------------------------ | --------------------------------- | -------------- | ------------ | ----------------------------- |
| GET         | `/api/stores`            |                                   |                | 400          | Show all available stores     |
| GET         | `/api/stores/:id`        |                                   |                |              | Show specific store           |
| POST        | `/api/stores`            | { name, img, location, products } | 201            | 400          | Create and save a new store   |
| PUT         | `/api/stores/:id`        | { name, img, location, products } | 200            | 400          | edit the store                |
| POST        | `/api/stores/:id/orders` | {products, customer, store}       |                |              | Place an order                |
| GET         | `/api/stores/:id/orders` |                                   |                |              | List all orders for the store |

### Orders

| HTTP Method | URL                   | Request Body            | Success status | Error Status | Description                         |
| ----------- | --------------------- | ----------------------- | -------------- | ------------ | ----------------------------------- |
| GET         | `/api/orders/:id`     |                         |                |              | List details of an order            |
| GET         | `/api/orders/:status` | {order_status}          |                |              | List all orders for the drivers     |
| DELETE      | `/api/orders/:id`     |                         |                |              | Delete Order                        |
| DELETE      | `/api/stores/:id`     |                         | 201            | 400          | delete store                        |
| GET         | `/api/customer/:id`   |                         |                |              | show the customer profile details   |
| PUT         | `/api/customer/:id`   | { name, img, location } | 200            | 404          | Update the customer profile details |

### Driver

| HTTP Method | URL               | Request Body            | Success status | Error Status | Description                       |
| ----------- | ----------------- | ----------------------- | -------------- | ------------ | --------------------------------- |
| GET         | `/api/driver`     |                         | 201            | 400          | show driver profile details       |
| PUT         | `/api/driver/:id` | { name, img, location } | 200            | 404          | Update the driver profile details |
| POST        | `/api/driver/`    | { name, img, location } | 200            | 404          | Create Driver account             |

<br>

## API's

<br>

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/PBqtkUFX/curasan) or a picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/screeeen/project-client)

[Server repository Link](https://github.com/screeeen/project-server)

[Deployed App Link](http://heroku.com)

### Slides

[Slides Link](http://slides.com) - The url to your _public_ presentation slides

### Contributors

FirstName LastName - <github-username> - <linkedin-profile-link>

FirstName LastName - <github-username> - <linkedin-profile-link>
