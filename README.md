# auth-server

### api-resource
```javascript
GET /users var payload = {}  return [users]
POST /signup var payload = { username, password } return user;
POST /signin var payload = { username, password } return { user, token }
```

### UML

<img src="./assets/lab11.png" />

### **.env**
```env
PORT=3000
MONGOOSE_URL=mongodb://localhost:27017/auth_server
JWT_SECRET_KEY="SECRET"
```

### package.json scripts
#### start
```sh
npm start # node index.js
```
#### dev
```sh
npm run dev # nodemon index.js
```
#### test
```sh
npm test # jest --coverage --verbose
```
#### lint
```sh
npm run lint # eslint './**/*.js' --ignore-pattern node_modules/
```
