const router = require("express").Router();
const { TruckCatModel } = require("../models");
const { Op } = require("sequelize");

router.get("/list", async (req, res) => {
    console.log(req.query);
    const { name } = req.query;
    let $query = {};
    if (name != undefined) {
        $query = {
            TRUCK_CAT_NAME: {
                [Op.like]: `%${name}%`
            }
        }
    }

    let result = await TruckCatModel.findAll({
        where: $query,
        attributes: [["TRUCK_CAT_ID", "id"], ["TRUCK_CAT_NAME", "name"]]
    });
    return res.send(result);
});

router.get("/detail", async (req, res) => {
    let { id } = req.query;
    try {
        let result = await DriverModel.findOne({
            where: {
                TRUCK_CAT_ID: id
            },
            attributes: [["TRUCK_CAT_ID", "id"], ["TRUCK_CAT_NAME", "name"]]
        });
        return res.send(result);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
});

router.post("/add", async (req, res) => {
    let { name } = req.body;
    try {
        let result = await DriverModel.create({
            TRUCK_CAT_NAME: name,
        });
        return res.sendStatus(200);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
});

router.post("/update", async (req, res) => {
    let { id } = req.query;
    let { name } = req.body;
    try {
        let result = await Driver.findOne({
            where: {
                TRUCK_CAT_ID: id
            }
        });
        if (name !== undefined) {
            result.TRUCK_CAT_NAME = name;
        }
        await result.save();
        return res.sendStatus(200);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
});

router.get("/delete", async (req, res) => {
    let { id } = req.query;
    try {
        let result = await Driver.destroy({
            where: {
                TRUCK_CAT_ID: id
            }
        });
        return res.sendStatus(200);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
});

module.exports = router;
