# Articles App Backend

This README provides an overview of the Articles App Backend, including instructions for installation, usage, and a detailed description of the main components and functions available in the application.
The Articles Backend provides the server-side functionality for managing articles and comments. It includes endpoints for creating, reading, updating, and deleting articles, as well as managing comments associated with articles.

## Installation

To install and run the Articles App Backend locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/QCmetrologist/artcl_back.git
```

2. Navigate to the project directory:

```bash
cd artcl_back
```
3. Create and fill .env file:
   
```bash
#DATABASE
DB_DATABASE='...'
DB_PASSWORD='...'
DB_USER='...'
DB_HOST=...
DB_PORT=...
DB_SCHEMA=...
DB_DIALECT=...

#SERVER_PORT
SERVER_PORT=...

#TOKEN
SECRET_ACCESS_TOKEN=...
```
4. Install dependencies:

```bash
npm install
```

5. Start the application:

```bash
npm start
node index.js
```

## Usage

Once the application is running, you can access it at http://localhost:3000

## API Endpoints

- GET /api/articles: Get all articles
    No Input Required: This endpoint retrieves all articles available in the database.
- GET /api/articles/:slug: Get an article by slug
    - **Path Parameters**:
        - *:slug (String)*: The unique identifier or slug of the article to retrieve. 
        - *example of result*:
        ```bash
        {
        "articles": [
            {
            "id": 16,
            "slug": "from-france-to-the-moon:-rocket-simulator-opens-in-toulouse",
            "title": "From France to the moon: rocket simulator opens in Toulouse",
            "description": "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/newscms/2014_10/240016/140309-cosmos-jms-1934.jpg",
            "body": "In Toulouse, France, the Cité de l'Espace is launching a new immersive experience: Lune Xplorer, where you can take a seat in a rocket simulator. You can climb aboard a spaceship similar to the one that will soon take man back to the Moon. Every detail is realistic, including the number of passengers: four per capsule. The simulator is in fact a centrifuge that reproduces all the effects of acceleration.",
            "createdAt": "2024-05-17T20:01:45.082Z",
            "updatedAt": "2024-05-17T20:01:45.098Z",
            "author": {
                "id": 9,
                "username": "user6"
            },
            "comment": []
            }, ...
        }
        ```
- POST /api/articles: Create a new article
    - **Request Body**:
        - *title (String)*: The title of the new article.
        - *description (String)*: A brief description or summary of the article.
        - *body (String)*: The main content or body of the article. 
- PUT /api/articles/:slug: Update an existing article
    - **Path Parameters**:
        - *:slug (String)*: The unique identifier or slug of the article to update.
    - **Request Body**:
        - *title (String)*: The updated title of the article.
        - *description (String)*: The updated description of the article.
        - *body (String)*: The updated body content of the article.
- DELETE /api/articles/:slug: Delete an article
    - **Path Parameters**:
        - *:slug (String)*: The unique identifier or slug of the article to delete.
- GET /api/comments/:articleId: Get comments for a specific article
    - **Path Parameters**:
        - *:articleId (String)*: The unique identifier of the article for which comments are requested.
- POST /api/comments/:articleId: Add a comment to an article
    - **Path Parameters**:
        - *:articleId (String)*: The unique identifier of the article to which the comment will be added.
    - **Request Body**:
        - *body (String)*: The content or text of the comment to be added.
- PUT /api/comments/:articleId: Update an existing comment
    - **Path Parameters**:
        - *:articleId (String)*: The unique identifier of the article containing the comment to update.
    - **Request Body**:
        - *body (String)*: The updated content or text of the comment.
- DELETE /api/comments/:articleId: Delete a comment
    - **Path Parameters**:
        - *:articleId (String)*: The unique identifier of the article containing the comment to delete.

## Authentication and Authorization

The backend uses JWT (JSON Web Tokens) for authentication. When a user successfully logs in, they receive a JWT token, which they include in the Authorization header of subsequent requests to access protected routes.

**verifyToken Middleware**

The verifyToken middleware is used to authenticate requests. It verifies the JWT token included in the Authorization header and sets the userId in the request object if the token is valid. If the token is invalid or missing, the middleware returns a 401 Unauthorized error.
Authorization

Authorization is handled using role-based access control. The backend includes middleware functions to check if a user has the necessary permissions to perform certain actions. For example, the isAdmin middleware ensures that only users with an admin role can access certain routes.

## Errors

The backend API of the artcl_back repository handles various HTTP requests and responds with appropriate status codes to indicate the success or failure of the operation. Here are the common HTTP status codes encountered in the backend:

- **400 Bad Request**
    - *Description*: This status code is returned when the server cannot process the request due to malformed syntax or invalid parameters in the client's request.
    - *Context*: Identify the endpoints or scenarios in the codebase where the server returns a 400 status code, such as when missing or invalid parameters are provided in a request.

- **201 Created**
    - *Description*: This status code indicates that the request has been fulfilled and resulted in the creation of a new resource.
    - *Context*: Describe the endpoints or operations in the backend codebase that result in the creation of new resources, such as adding a new article or user.

- **500 Internal Server Error**
    - *Description*: The server returns this status code when it encounters an unexpected condition that prevents it from fulfilling the request.
    - *Context*: Identify the areas of the codebase where unhandled exceptions or errors occur, leading to internal server errors.

- **200 OK**
    - *Description*: This status code indicates that the request has succeeded.
    - *Context*: Provide examples of endpoints or operations in the backend codebase where the server returns a 200 status code upon successful completion of a request.

- **404 Not Found**
    - *Description*: The server returns this status code when the requested resource is not found.
    - *Context*: Describe the scenarios or endpoints in the codebase where the server responds with a 404 status code, such as when accessing non-existent endpoints or resources.

- **401 Unauthorized**
    - *Description*: This status code indicates that the client is not authenticated and needs to provide valid credentials for access.
    - *Context*: Identify the endpoints or middleware functions in the backend codebase that require authentication, and describe how the server handles unauthorized requests.

- **422 Unprocessable Entity**
    - *Description*: This status code is returned when the server understands the content type of the request entity but cannot process the contained instructions.
    - *Context*: Provide examples of scenarios where the server responds with a 422 status code, such as when input validation fails or the request entity is malformed.