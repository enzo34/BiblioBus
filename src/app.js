const express = require('express');
const livreRoutes = require('./routes/livre.routes');
const authRoutes = require('./routes/auth.routes');
const empruntRoutes = require('./routes/emprunt.routes');

const app = express();
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'bibilobus-api' });
});
app.use('/api/auth', authRoutes);
app.use('/api/livres', livreRoutes);
app.use('/api/emprunt', empruntRoutes);
app.use(express.static('public'));

module.exports = app;
