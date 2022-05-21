const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const cors = require('cors');
const goalsRouter = require('./routes/goalRoutes');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/api/goals', goalsRouter);

app.use(errorHandler);


app.listen(port, () => console.log(`Server listening on port ${port}`));


