const { Sequelize } = require("sequelize");

const { defineCostModel, insertCostData } = require("./cost.model");
const { defineCustomerModel } = require("./customer.model");
const { defineDriverModel } = require("./driver.model");
const { defineOrderModel } = require("./order.model");
const { defineProvinceModel, insertProvinceData } = require("./province.model");
const { defineTruckCatModel, insertTruckCatData } = require("./truck_cat.model");
const { defineTruckModel } = require("./truck.model");
const { defineTruckTimelineModel } = require("./truck_timeline.model");
const { defineDriverTimelineModel } = require("./driver_timeline.model");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db/database.sqlite",
  freezeTableName: true,
  logging: (...msg) => {/*console.log(msg)*/ },
});

const TruckCatModel = defineTruckCatModel(sequelize);
const TruckModel = defineTruckModel(sequelize, TruckCatModel);
const DriverModel = defineDriverModel(sequelize);
const CustomerModel = defineCustomerModel(sequelize);
const OrderModel = defineOrderModel(sequelize, CustomerModel, TruckModel, DriverModel);
const ProvinceModel = defineProvinceModel(sequelize);
const CostModel = defineCostModel(sequelize, ProvinceModel, TruckCatModel);
const TruckTimelineModel = defineTruckTimelineModel(sequelize, TruckModel, OrderModel);
const DriverTimelineModel = defineDriverTimelineModel(sequelize, DriverModel, OrderModel);

(async () => {
  await sequelize.sync();
  await insertTruckCatData(TruckCatModel);
  await insertProvinceData(ProvinceModel);
  await insertCostData(CostModel);
})();

module.exports = {
  TruckCatModel,
  TruckModel,
  DriverModel,
  OrderModel,
  CustomerModel,
  ProvinceModel,
  CostModel,
  TruckTimelineModel,
  DriverTimelineModel
};
