# iNoteBook App

This web application is created using **React.js** with **Tailwind CSS**. The database is **MongoDB** for storing the user data and the notes added by particular user.

You can add your note with **_title_**, **_description_** and **_tag (optional)_**. You can also edit the note, delete the note whenever you need.

## Project Setup

### Backend

```
npm init
```

- NPM stands for **Node Package Manager**. It is the world's largest code library that contains over 800,000 code packages which can be installed through the command line.
- NPM itself is installed through Node.js. So to have npm in the command line, you must have **[Node.js](https://nodejs.org/en/)** installed.
- The command **_init_** is short for **initialize**. Before creating a new project, we need to specify some of the project's attributes. These attributes includes the project's name, project's description and project's version. There are various attributes but the name and version are the most important here.

```
npm install express cors mongoose jsonwebtoken express-validator bcryptjs
```

Install the above mentioned dependencies.

- **Express**: [Express.js](https://expressjs.com/) is a free and open-source web application framework for Node.js. It is used for designing and building web applications quickly and easily.

- **cors**: [CORS](https://expressjs.com/en/resources/middleware/cors.html) is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

- **mongoose**: [Mongoose](https://mongoosejs.com/) is an Object Data Modeling (ODM) library for **MongoDB** and **Node.js**. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB. MongoDB is a schema-less NoSQL document database.

- **jsonwebtoken**: [JWT](https://jwt.io/introduction), or JSON Web Token, is an open standard used to share security information between two parties — a client and a server.

- **express-validator**: [express-validator](https://express-validator.github.io/docs/) is a set of express.js middlewares that wraps validator.js validator and sanitizer functions.

- **bcryptjs**: The [bcrypt NPM package](https://www.npmjs.com/package/bcryptjs) is a JavaScript implementation of the bcrypt password hashing function that allows you to easily create a hash out of a password string.

```
npm install -D nodemon
```

- **nodemon**: nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.

- -D is shorthand for devDependencies. Dev dependencies are modules which are only required during development whereas dependencies are required at runtime.

### Database (MongoDB)

- [MongoDB](https://www.mongodb.com/what-is-mongodb) is an open source NoSQL database management program. NoSQL databases are quite useful for working with large sets of distributed data. MongoDB is a tool that can manage document-oriented information, store or retrieve information.

### Frontend

#### React.js

```
npx create-react-app iNoteBook
```

- **NPX**: The npx stands for Node Package Execute and it comes with the npm.

- This command will create a react app by the name iNoteBook.

#### Tailwind CSS

```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

- Install **Tailwind CSS** and its peer dependencies and then run the **_init_** command to generate two files **tailwind.config.js** and **postcss.config.js**.

- Now add the path to the tailwind config file as shown below:

```
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

- Now create an **_tailwind.css_** file in the src(source) folder and add the **@tailwind** directive to the file for each of the Tailwind's layers.

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

> Note: In this project I have created a css folder inside of the assets folder which is inside the src folder.

- The assets is where you would put your _images/stylesheets/videos_ etc. that you will import in the vue files.

- Now after following the above steps, import the css file in the **index.js** file.

```
import "./assets/css/tailwind.css";
```

Installing few more packages for our frontend.

```
npm install react-router-dom concurrently
```

- **react-router-dom**: The react-router-dom package contains bindings for using React Router in web applications.

- **concurrently**: Concurrently is an npm package that allows us to run multiple commands concurrently.

#### Concurrently run the server

```
npm run both
```

- This command will run backend and frontend server concurrently.
