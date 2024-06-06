# BLOG (NODEJS, EXPRESS, REACT and MYSQL)
### DESCRIPTION:
This blog project is made with Node.js, Express, React and MySQL.\
Users can register, change their photo image, write their blog, edit their blog and upload the picture.

---

### HOW TO USE:
1. Create a MySQL database (`/api/schema.sql`).
2. Create `.env` file: set your **MySQL data** (HOST, USER, PASSWORD...), **backend port** and **secret key of JWT**.
3. In `/client/package.json` file, set `proxy` to backend port.
4. Install packages in `/client` and `/api` respectively.
5. Create two folders `headshot` and `upload` in `/client/public` directory.

---

### THE PROBLEMS I MET:
1. **import** and **require**\
CommonJS -> require, ESModule -> import (import js file must add **.js**)\
[Ref 1](https://stackoverflow.com/questions/46677752/the-difference-between-requirex-and-import-x),
[Ref 2](https://stackoverflow.com/questions/31354559/using-node-js-require-vs-es6-import-export)
2. useState: `setInputs(prev => {prev..., })`\
Use `prev` to keep the original data
3. If `req.body.<name> = Null`, check the name of `<form>`
4. useContext / creatContext: do not misspell `children` (authContext.js)
5. Send data (image file) from frontend to backend:
`const formData = new FormData(); formData.append('<fieldname>', file);` (Write.jsx)
6. If you want to use the data from response of `axios` and `fetch`.\
`axios`: `const data = res.data;`, axios automatic transforms for JSON data\
`fetch`: `const data = await res.json();`.
7. npm multer:\
If you want to store file into different directory, do not use **shorthand**, [Ref 1](https://www.npmjs.com/package/multer)
```
const storage_1 = multer.memoryStorage(...directory_1);
const storage_2 = multer.memoryStorage(...directory_2);
const upload = multer({ storage: storage_1 });
const upload = multer({ storage: storage_2 });
```

---

### NODE PACKAGES:
**Front End**
> - react
> - react-router-dom
> - sass
> - axios
> - react-quill
> - moment

**Back End**
> - express
> - dotenv
> - cookie-parser
> - bcryptjs
> - jsonwebtoken
> - multer (uploading files to server)
> - mysql2



---

### STEPS:
**Front End**
> - 📁 src -> 📁 pages (Home.jsx, Login.jsx, Register.jsx, Single.jsx, Write.jsx)
> - 📁 src -> app.js
> - 📁 src -> 📁 components (Footer.jsx, Navbar.jsx)
> - 📁 src -> style.scss
> - 📁 src -> 📁 img

**Back End**
> - index.js
> - database.js
> - MySQL
> - 📁 routes (auth.js, posts.js, users.js)
> - 📁 controllers (auth.js, posts.js, users.js)

**Front End**
> - 📁 src -> 📁 context (authContext.js)

### App Preview
<table width="100%"> 
<tr>
<td width="50%">      
    &nbsp; 
    <br>
    <p align="center">Home Page</p>
    <img src="">
    </td> 
<td width="50%">
    <br>
    <p align="center">Single Page</p>
    <img src="">  
</td>
</table>