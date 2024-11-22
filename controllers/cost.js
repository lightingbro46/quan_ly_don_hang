const router = require("express").Router();
const { CostModel, DriverTimelineModel } = require("../models");
const { Op } = require("sequelize");

router.get("/list", async (req, res) => {
    console.log(req.query);
    return res.send({
        totalCount: 1,
        data: [{
            id: 1,
            DRIVER_NAME: "Anh",
            DRIVER_GENDER: 1,
            DRIVER_PHONE: "101001010",
            DRIVER_STATUS: 1,
        },
        {
            DRIVER_ID: 2,
            DRIVER_NAME: "Anhâ",
            DRIVER_GENDER: 2,
            DRIVER_PHONE: "1010010210",
            DRIVER_STATUS: 2,
        },]
    });
    const query = req.query;
    let $query = [];
    if (query.string != undefined) {
        let $query_string = {
            [Op.or]: [{
                DRIVER_NAME: {
                    [Op.like]: `%${query.string}%`
                }
            }, {
                DRIVER_PHONE: {
                    [Op.like]: `%${query.string}%`
                }
            }],
        }
        $query.push($query_string);
    }
    if (query.driver_status != undefined) {
        let $query_status = {
            DRIVER_STATUS: query.driver_status
        };
        $query.push($query_status);
    }
    let result = await DriverModel.findAll({
        where: {
            [Op.and]: $query
        }
    });
    return res.send(result);
});

router.get("/detail", async (req, res) => {
    let { id } = req.query;
    try {
        let result = await DriverModel.findOne({
            where: {
                DRIVER_ID: id
            }
        });
        return res.send(result);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
});

router.post("/add", async (req, res) => {
    let { driver_name, driver_phone, driver_gender } = req.body;
    try {
        let result = await DriverModel.create({
            DRIVER_NAME: driver_name,
            DRIVER_PHONE: driver_phone,
            DRIVER_GENDER: driver_gender,
            DRIVER_STATUS: 1,
        });
        return res.send(result);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
});

router.post("/update", async (req, res) => {
    let { id } = req.query;
    let { driver_name, driver_phone, driver_gender, driver_status } = req.body;
    try {
        let result = await Driver.findOne({
            where: {
                id: id
            }
        });
        if (driver_name !== undefined) {
            result.DRIVER_NAME = driver_name;
        }
        if (driver_phone !== undefined) {
            result.DRIVER_PHONE = driver_phone;
        }
        if (driver_gender !== undefined) {
            result.DRIVER_GENDER = driver_gender;
        }
        if (driver_status !== undefined) {
            result.DRIVER_STATUS = driver_status;
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
        let result = await Driver.destroy({
            where: {
                DRIVER_ID: id
            }
        });
        return res.sendStatus(200);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
});

router.post("/available", async (req, res) => {
    let { id } = req.query;
    try {
        let result = await Driver.destroy({
            where: {
                DRIVER_ID: id
            }
        });
        return res.sendStatus(200);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
});

module.exports = router;
