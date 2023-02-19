const express = require('express');
const app = express();

// Route to handle requests to /api/:date?
app.get('/api/:date?', (req, res) => {
  let dateStr = req.params.date;
  let date;

  if (!dateStr) {
    // If date parameter is not provided, use current date
    date = new Date();
  } else {
    // Attempt to parse the provided date parameter
    if (/^\d+$/.test(dateStr)) {
      // If parameter is a number, assume it is a Unix timestamp
      date = new Date(parseInt(dateStr));
    } else {
      // Otherwise, attempt to parse the parameter as a date string
      date = new Date(dateStr);
    }
  }

  // Check if the parsed date is valid
  if (date.toString() === 'Invalid Date') {
    res.json({ error: 'Invalid Date' });
  } else {
    // Construct the response object
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
