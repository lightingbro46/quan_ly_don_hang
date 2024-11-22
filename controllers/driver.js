const router = require("express").Router();
const { DriverModel, DriverTimelineModel } = require("../models");
const { Op } = require("sequelize");

router.get("/list", async (req, res) => {
    console.log(req.query);
    return res.send({
        totalCount: 2,
        results: [{
            id: 1,
            name: "Anh",
            gender: 1,
            phone: "101001010",
            status: 1,
        },
        {
            id: 2,
            name: "Anhâ",
            gender: 2,
            phone: "1010010210",
            status: 2,
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
    if (query.status != undefined) {
        let $query_status = {
            DRIVER_STATUS: query.status
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
    let { name, phone, gender } = req.body;
    try {
        let result = await DriverModel.create({
            DRIVER_NAME: name,
            DRIVER_PHONE: phone,
            DRIVER_GENDER: gender,
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
    let { name, phone, gender, status } = req.body;
    try {
        let result = await DriverModel.findOne({
            where: {
                id: id
            }
        });
        if (name !== undefined) {
            result.DRIVER_NAME = name;
        }
        if (phone !== undefined) {
            result.DRIVER_PHONE = phone;
        }
        if (gender !== undefined) {
            result.DRIVER_GENDER = gender;
        }
        if (status !== undefined) {
            result.DRIVER_STATUS = status;
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
        let result = await DriverModel.destroy({
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
        let result = await DriverModel.destroy({
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
