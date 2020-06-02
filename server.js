const app = require('./app.js');
require('dotenv').config();

const PORT = process.env.Port;

app.listen(PORT, () =>
console.log(
`Server started on PORT ${PORT}`
));