const express = require('express');
const librarianRouter = require('./routes/librarianRoutes');
const app = express();
const port = 3000;

app.use('/books', librarianRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});