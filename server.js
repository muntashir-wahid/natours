const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

const db = process.env.DATABASE.replace(
  '<PASSWORD/>',
  process.env.DB_PASSWORD
).replace('<USERNAME/>', process.env.DB_USER);

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connected successfully!'));

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour munst have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'Notun dhaka',
  price: 10000,
  raring: 1.2,
});

testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((error) => {
    console.log('Error 💥', error);
  });

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
