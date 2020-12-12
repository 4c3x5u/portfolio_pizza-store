import express from 'express';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import cors from 'cors';
import routes from './routes/drinkRoutes';

const app = express();
const PORT = 4000;

// mongo connection
// eslint-disable-next-line no-undef
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/pizzaStore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// bodyparser setup
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// CORS setup
app.use(cors());

routes(app);

app.get('/', (req, res) => res.send(`The pizza store server is running at ${PORT}.`));

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`The pizza store server is running at ${PORT}.`));
