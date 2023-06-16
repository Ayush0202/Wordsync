# WordSync #


Wordsync is a real-time document collaboration platform built using MERN `(MongoDB, Express.js, React.js, Node.js)` stack. It allows multiple users to collaborate on the same document simultaneously, providing a seamless and efficient collaborative writing experience. With wordsync, users can create, edit, and share documents in real-time, fostering collaboration and enhancing productivity

Project can be viewed [here](https://wordsync-one.vercel.app/) and Demo can be viewed [here](https://github.com/Ayush0202/Wordsync)

## Features ##

- **Real-time collaboration** : Multiple users can work on the same document simultaneously, with changes instantly reflected for all participants
- **Document Management** : Users can create, edit and delete documents
- **User Authentication** : Secure user registration and login functionality using `Bcrypt.js` and `JSON Web Tokens (JWT)`
- **Dashboard** : Users have access to a personalized dashboard that displays their documents and allows quick navigation
- **Protected Routes** : Only authenticated users are allowed to access application features
- **Delete Account** : Users can delete their account along with all of their documents
- **Responsive Design** : Responsive design for Laptop, Tablet and Mobile Phones

## Installation ##

Clone the repository:
```
$ git clone https://github.com/Ayush0202/Wordsync.git
```

Navigate to the project directory:
```
$ cd wordsync
```

### Setting up the Client ###

Navigate to client directory:
```
$ cd client
```

Install the client dependencies
```
$ npm install
```

Set up environment variables
- Create a `.env` file in the client directory
- Specify the following variable int the `.env` file
```
REACT_APP_SERVER_URL=
```

Start the client development server
```
$ npm start
```

The client application will be accessible at `http://localhost:3000`

### Setting up the Server

Navigate to server directory
```
$ cd server
```

Install the server dependencies
```
$ npm install
```

Set up the environment variables
- Create a `.env` file in the server directory
- Specify the following variables in the `.env` file
```
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
SECRET_KEY=
CLIENT_URL=
```
Use `openssl rand -base64 24` to generate key and add it under `SECRET_KEY` int the `.env` file

Start the server
```
$ npm start
```

The server will be running at `http://localhost:5000`

Make sure to start both client and server to fully utilize the Wordsync application

### Technologies Used ###

- MongoDB: A NoSQL database used to store documents and user information.
- Express.js: A flexible web application framework for Node.js used to handle server-side logic and API routes.
- React.js: A JavaScript library used for building the user interface and managing the application's state.
- Node.js: A JavaScript runtime environment used for server-side scripting.
- Socket.IO: A library that enables real-time, bidirectional communication between the server and the clients.
- JSON Web Tokens (JWT): A standard for securely transmitting information between parties as a JSON object.
- Bcrypt -  Library for hashing passwords.
- Material UI - A library of React UI components 
- Quill.js - A modern rich text editor





