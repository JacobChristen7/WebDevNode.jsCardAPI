const express = require('express');
const app = express();
const port = 2005;

const getTokenRoute = require('./routes/getToken'); // Import routes
const cardsRoute = require('./routes/cards');

app.use(express.json());

// Use the routes
app.use('/getToken', getTokenRoute);
app.use('/cards', cardsRoute);

// Global error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace for debugging
  res.status(500).json({ errorMessage: 'An internal server error occurred.' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});