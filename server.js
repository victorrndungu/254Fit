const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8082;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Send all requests to the index.html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
