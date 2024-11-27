const { Sequelize } = require("sequelize");

const { defineCostModel, insertCostData } = require("./cost.model");
const { defineCustomerModel } = require("./customer.model");
const { defineDriverModel } = require("./driver.model");
const { defineOrderModel } = require("./order.model");
const { defineTruckCatModel, insertTruckCatData } = require("./truck_cat.model");
const { defineTruckModel } = require("./truck.model");
const { defineUserModel, insertUserData } = require("./user.model");


const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db/database.sqlite",
  freezeTableName: true,
  logging: (...msg) => {/*console.log(msg)*/ },
});

const UserModel = defineUserModel(sequelize);
const TruckCatModel = defineTruckCatModel(sequelize);
const TruckModel = defineTruckModel(sequelize, TruckCatModel);
const DriverModel = defineDriverModel(sequelize);
const CustomerModel = defineCustomerModel(sequelize);
const OrderModel = defineOrderModel(sequelize, CustomerModel, TruckModel, DriverModel, UserModel);
const CostModel = defineCostModel(sequelize);

(async () => {
  await sequelize.sync({ alter: true });
  await insertTruckCatData(TruckCatModel);
  await insertCostData(CostModel);
  await insertUserData(UserModel);
})();

module.exports = {
  TruckCatModel,
  TruckModel,
  DriverModel,
  OrderModel,
  CustomerModel,
  CostModel,
  UserModel,
};
