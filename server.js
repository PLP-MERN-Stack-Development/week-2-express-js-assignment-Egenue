const express = require('express');
const app = express();
const productRoutes = require('./routes/products');
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');
require('dotenv').config();

app.use(logger);
app.use(auth);
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/products', productRoutes);

// Global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));