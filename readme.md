# Social Emulator Api

This is a Node.js and MongoDB based API for a social emulator app. It was created for BairesDev Nodejs Test

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv

## Installation and Running

1. Clone the repository.
2. Run `npm install` to install all dependencies.
3. Create a `.env` file in the root directory and set your `PORT` and `MONGO` connection string.
4. Run `npm start` to start the server.
5. Run `npm dev` to start the sever in dev env using nodemon

## Routes

- `/api/users`: User related operations.
- `/api/posts`: Post related operations.
- `/api/action`: Action related operations.
  - `like`
  - `unlike`
  - `follow`
  - `unfollow`
- `/api/comment`: Comment related operations.

## API Collection

There is a Postman collection file that can be used to test the api

## ENV
Your env file configuration should look similar to this example:
```env
MONGO_USER=youruser
MONGO_PASSWORD=yourpassword
MONGO='mongodb+srv://youruser:yourpassword@YourDeploymentIdentifierInAtlas.mongodb.net/YourDB?retryWrites=true&w=majority&appName=YourAppName'
JWT_SECRET=yourjwt
```
