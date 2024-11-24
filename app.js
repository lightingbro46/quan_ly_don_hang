const express = require("express");
const cors = require('cors');
const path = require('path');
require("./models");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(new Date(), req.url);
  next();
});

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use("/api/trucks", require("./controllers/truck"));
app.use("/api/truck_cats", require("./controllers/truck_cat"));
app.use("/api/costs", require("./controllers/cost"));
app.use("/api/drivers", require("./controllers/driver"));
app.use("/api/customers", require("./controllers/customer"));
app.use("/api/orders", require("./controllers/order"));

app.listen(3000, () => {
  console.log("Service is running on port 3000");
});
