const router = require("express").Router();
const driverModel = require("../models/driver.model");
const { OrderModel, DriverModel, TruckModel, UserModel } = require("../models/index");

router.get("/list", async (req, res) => {
    console.log(req.query);
    try {
        let totalCount = await OrderModel.count({
            where: {
                is_deleted: false
            }
        });
        let results = await OrderModel.findAll({
            where: {
                is_deleted: false
            },
            include: [
                {
                    model: DriverModel,
                    attributes: ["name"]
                },
                {
                    model: TruckModel,
                    attributes: ["name", "license_plate"]
                },
            ]
        });

        return res.send({
            totalCount,
            results
        });
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }

});

router.get("/detail", async (req, res) => {
    let { id } = req.query;
    try {
        let result = await OrderModel.findOne({
            where: {
                id: id,
                is_deleted: false
            },
            include: [
                {
                    model: DriverModel,
                    as: "driver",
                    attributes: ["name"]
                },
                {
                    model: TruckModel,
                    as: "truck",
                    attributes: ["license_plate"]
                }
            ]
        });
        if (!result)
            return res.sendStatus(404);
        return res.send(result);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }

});

router.post("/add", async (req, res) => {
    let { departure, arrival, material, weight, start_date, end_date, truck_id, driver_id, customer_id, user_id, pricing, tolls, payment_status } = req.body;
    try {
        let result = await OrderModel.create({
            departure: departure,
            arrival: arrival,
            material: material,
            weight: weight,
            start_date: start_date,
            end_date: end_date,
            truck_id: truck_id,
            driver_id: driver_id,
            customer_id: customer_id,
            user_id: user_id,
            pricing: pricing,
            tolls: tolls,
            payment_status: payment_status
        });
        return res.send(result);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }

});

router.post("/update", async (req, res) => {
    let { id } = req.query;
    let { departure, arrival, material, weight, start_date, end_date, truck_id, driver_id, customer_id, user_id, pricing, tolls, status, payment_status } = req.body;
    try {
        let result = await OrderModel.findOne({
            where: {
                id: id,
                is_deleted: false
            }
        });

        if (!result)
            return res.sendStatus(404);

        if (departure !== undefined) {
            result.departure = departure;
        }
        if (arrival !== undefined) {
            result.arrival = arrival;
        }
        if (material !== undefined) {
            result.material = material;
        }
        if (weight !== undefined) {
            result.weight = weight;
        }
        if (start_date !== undefined) {
            result.start_date = start_date;
        }
        if (end_date !== undefined) {
            result.end_date = end_date;
        }
        if (truck_id !== undefined) {
            result.truck_id = truck_id;
        }
        if (driver_id !== undefined) {
            result.driver_id = driver_id;
        }
        if (customer_id !== undefined) {
            result.customer_id = customer_id;
        }
        if (user_id !== undefined) {
            result.user_id = user_id;
        }
        if (pricing !== undefined) {
            result.pricing = pricing;
        }
        if (tolls !== undefined) {
            result.tolls = tolls;
        }
        if (status !== undefined) {
            result.status = status;
        }
        if (payment_status !== undefined) {
            result.payment_status = payment_status;
        }
        await result.save();
        return res.send(result);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
});

router.get("/delete", async (req, res) => {
    let { id } = req.query;
    try {
        let result = await OrderModel.findOne({
            where: {
                id: id,
                is_deleted: false
            }
        });
        if (!result)
            return res.sendStatus(404);
        result.is_deleted = true;
        await result.save();
        return res.sendStatus(200);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
});

module.exports = router;
