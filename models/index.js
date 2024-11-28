const { Sequelize } = require("sequelize");

const { defineCostModel, insertCostData } = require("./cost.model");
const { defineCustomerModel } = require("./customer.model");
const { defineDriverModel } = require("./driver.model");
const { defineOrderModel } = require("./order.model");
const { defineTruckCatModel, insertTruckCatData } = require("./truck_cat.model");
const { defineTruckModel } = require("./truck.model");
const { defineUserModel, insertUserData } = require("./user.model");

const db = { Sequelize };

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db/database.sqlite",
  freezeTableName: true,
  logging: (...msg) => { /*console.log(msg)*/ },
});
db.sequelize = sequelize;

const UserModel = defineUserModel(sequelize);
db.UserModel = UserModel;

const TruckCatModel = defineTruckCatModel(sequelize);
db.TruckCatModel = TruckCatModel;

const TruckModel = defineTruckModel(sequelize);
db.TruckModel = TruckModel;

const DriverModel = defineDriverModel(sequelize);
db.DriverModel = DriverModel;

const CustomerModel = defineCustomerModel(sequelize);
db.CustomerModel = CustomerModel;

const OrderModel = defineOrderModel(sequelize);
db.OrderModel = OrderModel;

const CostModel = defineCostModel(sequelize);
db.CostModel = CostModel;


UserModel.associations(db);
TruckCatModel.associations(db);
TruckModel.associations(db);
DriverModel.associations(db);
CustomerModel.associations(db);
OrderModel.associations(db);

(async () => {
  await sequelize.sync();
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
