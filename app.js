const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const testRouteHandler = (req, res) => {
  res.status(200).json({ app: 'Natours', message: 'Hello from the server!' });
};

// ---------------------- //
// Route handlers
// ---------------------- //

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const id = +req.params.id;

  const tour = tours.find((tour) => tour.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  const newTour = req.body;

  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
};

const updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Updated tour here...',
    },
  });
};

const deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

// ---------------------- //
// All routes
// ---------------------- //
app.get('/', testRouteHandler);
app.get('/api/v1/tours', getAllTours);
app.get('/api/v1/tours/:id', getTour);
app.post('/api/v1/tours', createTour);
app.patch('/api/v1/tours/:id', updateTour);
app.delete('/api/v1/tours/:id', deleteTour);

const port = 5000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
