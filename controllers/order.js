const router = require("express").Router();
const { OrderModel } = require("../models/index");
const { Op, where, DataTypes } = require("sequelize");

router.get("/list", async (req, res) => {
    console.log(req.query);
    return res.send({
        totalCount: 1,
        results: [{
            id: 1,
            departure: "abba",
            arrival: "Ddd",
            startDate: "12/2/2024",
            endDate: "15/2/2024",
            material: "Đá",
            weight: "10",
            truckId: 1,
            truckLicensePlate: "14U1",
            driverId: 2,
            driverName: "anh",
            customerId: 1,
            customerName: "binh",
            pricing: 10000000,
            cost: 200000,
            status: 2,
            payment: 1
        }]
    })
    const { order_id, order_start_date, order_end_date, order_customer, order_truck, order_driver, order_status } = req.query;
    let $query = [];
    if (order_id != undefined) {
        let $query_string = {
            ORDER_ID: {
                [Op.like]: `%${order_id}%`
            }
        }
        $query.push($query_string);
    }
    if (order_start_date != undefined) {
        let $query_date = {
            ORDER_START_DATE: {
                [Op.gte]: order_start_date
            }
        }
        $query.push($query_date);
    }

    if (order_end_date != undefined) {
        let $query_date = {
            ORDER_END_TIME: {
                [Op.lte]: order_end_date
            }
        }
        $query.push($query_date);
    }

    if (order_customer != undefined) {
        let $query_string = {
            ORDER_CUSTOMER_ID: {
                [Op.eq]: order_customer
            }
        }
        $query.push($query_string);
    }

    if (order_truck != undefined) {
        let $query_string = {
            ORDER_TRUCK_ID: {
                [Op.eq]: order_truck
            }
        }
        $query.push($query_string);
    }

    if (order_driver != undefined) {
        let $query_string = {
            ORDER_DRIVER_ID: {
                [Op.eq]: order_driver
            }
        }
        $query.push($query_string);
    }

    if (order_status != undefined) {
        let $query_string = {
            ORDER_STATUS: {
                [Op.eq]: order_status
            }
        }
        $query.push($query_string);
    }
    let result = await Driver.findAll({
        where: {
            [Op.and]: $query
        }
    });
    return res.send(result);
});

router.get("/detail", async (req, res) => {
    let { id } = req.query;
    try {
        let result = await OrderModel.findOne({
            where: {
                ORDER_ID: id
            }
        });
        return res.send(result);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }

});

router.post("/add", async (req, res) => {
    let body = req.body;
    try {
        let result = await OrderModel.create({
            ORDER_DEPARTURE: body.order_departure,
            ORDER_ARRIVAL: body.order_arrival,
            ORDER_MATERIAL: body.order_material,
            ORDER_TOTAL_WEIGHT: body.order_total_weight,
            ORDER_START_DATE: body.order_start_date,
            ORDER_END_DATE: body.order_end_date,
            ORDER_CUSTOMER_ID: body.order_customer,
            ORDER_TRUCK_ID: body.order_truck,
            ORDER_DRIVER_ID: body.order_driver,
            ORDER_STATUS: 1,
            ORDER_PAYMENT_STATUS: body.order_payment_status
        });
        return res.send(result);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }

});

router.post("/update", async (req, res) => {
    let { id } = req.query;
    let { code, startTime, endTime, truckId, driverId, content, status } = req.body;
    try {
        let result = await OrderModel.findOne({
            where: {
                id: id
            }
        });

        if (code !== undefined) {
            result.code = code;
        }
        if (startTime !== undefined) {
            result.startTime = startTime;
        }
        if (endTime !== undefined) {
            result.endTime = endTime;
        }
        if (customerId !== undefined) {
            result.customerId = customerId;
        }
        if (truckId !== undefined) {
            result.truckId = truckId;
        }
        if (driverId !== undefined) {
            result.driverId = driverId;
        }
        if (content !== undefined) {
            result.content = content;
        }
        if (status !== undefined) {
            result.status = status;
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
        let result = await OrderModel.destroy({
            where: {
                id: id
            }
        });
        return res.send(result);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
});

router.post("/export", async (req, res) => {
    return res.sendStatus(200);
});

module.exports = router;
