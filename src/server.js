require('dotenv').config();
const app = require('./app');
const connectDb = require('./config/db');

const PORT = process.env.PORT || 3000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log('serveur démarré sur http://localhost:' + PORT);
  });
});
