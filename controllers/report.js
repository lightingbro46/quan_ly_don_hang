const router = require("express").Router();
const { CustomerModel, OrderModel, DriverModel, UserModel, TruckModel } = require("../models");

router.get("/overview", async (req, res) => {
    const customer_count = await CustomerModel.count({
        where: {
            is_deleted: false,
        }
    });
    const order_count = await OrderModel.count({
        where: {
            is_deleted: false,
        }
    });
    const driver_count = await DriverModel.count({
        where: {
            is_deleted: false,
        }
    });
    const user_count = await UserModel.count({
        where: {
            is_deleted: false,
        }
    });
    const truck_count = await TruckModel.count({
        where: {
            is_deleted: false,
        }
    });
    const truck_unavailable_count = await TruckModel.count({
        where: {
            is_deleted: false,
            status: 3
        }
    });
    return res.send({
        totalCount: {
            customer: customer_count,
            order: order_count,
            driver: driver_count,
            user: user_count,
            truck: truck_count,
            truck_unavailable: truck_unavailable_count,
        }
    });
});

router.post("/export", async (req, res) => {
    return res.sendStatus(200);
});

module.exports = router;