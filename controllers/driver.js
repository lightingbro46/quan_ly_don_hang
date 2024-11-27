const router = require("express").Router();
const { DriverModel, DriverTimelineModel } = require("../models");
const { Op } = require("sequelize");

router.get("/list", async (req, res) => {
    console.log(req.query);
    const query = req.query;
    let $query = [];
    if (query.string != undefined) {
        let $query_string = {
            [Op.or]: [{
                name: {
                    [Op.like]: `%${query.string}%`
                }
            }, {
                phone_number: {
                    [Op.like]: `%${query.string}%`
                }
            }],
        }
        $query.push($query_string);
    }
    if (query.status != undefined) {
        let $query_status = {
            status: query.status
        };
        $query.push($query_status);
    }
    let countTotal = await DriverModel.count({
        where: {
            [Op.and]: $query
        }
    });
    let results = await DriverModel.findAll({
        where: {
            [Op.and]: $query,
            is_deleted: false
        }
    });
    return res.send({
        countTotal,
        results
    });
});

router.get("/detail", async (req, res) => {
    let { id } = req.query;
    try {
        let result = await DriverModel.findOne({
            where: {
                id: id,
                is_deleted: false
            }
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
    let { name, birthday, phone, gender } = req.body;
    try {
        let result = await DriverModel.create({
            name: name,
            birthday: birthday,
            phone_number: phone,
            gender: gender,
            status: 1,
        });
        return res.send(result);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
});

router.post("/update", async (req, res) => {
    let { id } = req.query;
    let { name, phone, birthday, gender, status } = req.body;
    try {
        let result = await DriverModel.findOne({
            where: {
                id: id,
                is_deleted: false
            }
        });
        if (name !== undefined) {
            result.name = name;
        }
        if (birthday !== undefined) {
            result.birthday = birthday;
        }
        if (phone !== undefined) {
            result.phone_number = phone;
        }
        if (gender !== undefined) {
            result.gender = gender;
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
        let result = await DriverModel.destroy({
            where: {
                id: id,
                is_deleted: false
            }
        });
        if (!result) {
            return res.sendStatus(404);
        }
        result.is_deleted = true;
        await result.save();
        return res.sendStatus(200);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
});

router.post("/available", async (req, res) => {
    let { id } = req.query;
    let { start_date, end_date } = req.body;
    try {
        let countTotal = await DriverModel.count({
            where: {
                id: id,
                status: 1,
                is_deleted: false
            }
        });
        let results = await DriverModel.findAll({
            where: {
                id: id,
                status: 1,
                is_deleted: false
            }
        });
        return res.send({
            countTotal,
            results
        });
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
});

module.exports = router;
