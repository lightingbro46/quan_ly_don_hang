const router = require("express").Router();
const { TruckModel } = require("../models");
const { Op } = require("sequelize");

router.get("/list", async (req, res) => {
    console.log(req.query);
    return res.send({
        totalCount: 2,
        results: [{
            id: 1,
            licensePlate: "14uuuuuu",
            catId: 1,
            status: 1,
        },
        {
            id: 2,
            licensePlate: "15uuuuuu",
            catId: 3,
            status: 2,
        },]
    });
    const { licensePlate, catId, status } = req.query;
    let $query = {};
    
    if (licensePlate) {
        $query.TRUCK_LICENSE_PLATE = {
            [Op.like]: `%${licensePlate}%`
        }
    }
    if (catId) {
        $query.TRUCK_CAT_ID = catId;
    }
    if (status) {
        $query.TRUCK_STATUS = status;
    }
    let result = await Truck.findAll({
        where: $query
    });
    return res.send(result);
});

router.get("/detail", async (req, res) => {
    let { id } = req.query;
    try {
        let result = await Truck.findOne({
            where: {
                TRUCK_ID: id
            }
        });
        return res.send(result);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }

});

router.post("/add", async (req, res) => {
    let { licensePlate, catId } = req.body;
    try {
        let result = await Truck.create({
            TRUCK_LICENSE_PLATE: licensePlate,
            TRUCK_CAT_ID: catId,
            TRUCK_STATUS: 1
        });
        return res.send(result);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
});

router.post("/update", async (req, res) => {
    let { id } = req.query;
    let { licensePlate, catId, status } = req.body;
    try {
        let result = await Truck.findOne({
            where: {
                TRUCK_ID: id
            }
        });
        if (licensePlate !== undefined) {
            result.TRUCK_LICENSE_PLATE = licensePlate;
        }
        if (catId !== undefined) {
            result.TRUCK_CAT_ID = catId;
        }
        if (status !== undefined) {
            result.TRUCK_STATUS = status;
        }
        await result.save({});
        return res.send(result);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
});

router.get("/delete", async (req, res) => {
    let { id } = req.query;
    try {
        let result = await Truck.destroy({
            where: {
                TRUCK_ID: id
            }
        });
        return res.sendStatus(200);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
});

module.exports = router;
