const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use(morgan('dev'));

// ---------------------- //
// Mount routers
// ---------------------- //
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// ---------------------- //
// Start the server
// ---------------------- //
const port = 5000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
