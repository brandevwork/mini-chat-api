const dotenv = require("dotenv");
dotenv.config();

const server = require('./server');

// eslint-disable-next-line no-undef
const port = process.env.PORT || 5050;

server.listen(port, () => {
  console.log(`\n*** Server Running on port ${port}***\n`);
});
