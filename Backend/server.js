const dotenv = require('dotenv');
dotenv.config();
const app = require('./src/app');


app.get('/', (req, res) => {
  res.send('Hello World');
})
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});