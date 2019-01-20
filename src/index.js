const express = require('express');
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const config = require("config");
var cors = require('cors');

app.use(express.json());
app.use(helmet());
app.use(cors());

const streaks = require("./routes/streaks");
app.use("/api/streaks", streaks);

mongoose.connect(config.get("db_connection_string"))
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.error(err))

app.get('/', (req, res) => res.send('Hello World!'))

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});