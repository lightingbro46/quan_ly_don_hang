const router = require("express").Router();
const { DriverModel, DriverTimelineModel, OrderModel } = require("../models");
const { Op } = require("sequelize");

router.get("/list", async (req, res) => {
    console.log(req.query);
    let countTotal = await DriverModel.count({
        where: {
            is_deleted: false
        }
    });
    let results = await DriverModel.findAll({
        where: {
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
    let { name, identification, birthday, phone_number, gender } = req.body;
    try {
        let result = await DriverModel.create({
            name: name,
            identification: identification,
            birthday: birthday,
            phone_number: phone_number,
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
    let { name, identification, phone_number, birthday, gender, status } = req.body;
    try {
        let result = await DriverModel.findOne({
            where: {
                id: id,
                is_deleted: false
            }
        });

        if (!result)
            return res.sendStatus(404);

        if (name !== undefined) {
            result.name = name;
        }
        if (identification !== undefined) {
            result.identification = identification;
        }
        if (birthday !== undefined) {
            result.birthday = birthday;
        }
        if (phone_number !== undefined) {
            result.phone_number = phone_number;
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
        let result = await DriverModel.findOne({
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

router.post("/available", async (req, res) => {
    let { start_date, end_date, q } = req.body;
    if (!start_date || !end_date)
        return res.sendStatus(400);

    let $query = {}
    if (q != undefined) {
        $query.name = {
            [Op.like]: `%${q}%`
        }
    }

    try {
        let countTotal = await DriverModel.count({
            where: {
                status: {
                    [Op.ne]: 3
                },
                is_deleted: false,
            },
            include: [
                {
                    model: OrderModel,
                    as:"orders",
                    required: false,
                    where: {
                        is_deleted: false,
                        status: {
                            [Op.ne]: 5
                        },
                        [Op.or]: [
                            {
                                start_date: {
                                    [Op.between]: [start_date, end_date],
                                }
                            },
                            {
                                end_date: {
                                    [Op.between]: [start_date, end_date],
                                }
                            },
                            {
                                start_date: {
                                    [Op.lte]: start_date,
                                },
                                end_date: {
                                    [Op.gte]: end_date,
                                },
                            }
                        ]
                    }
                }
            ]
        });
        let results = await DriverModel.findAll({
            where: {
                status: 1,
                is_deleted: false,
                "$ORDERS.id$": null,
                ...$query
            },
            attributes: ["id", "name", "phone_number"],
            include: [
                {
                    model: OrderModel,
                    as:"orders",
                    required: false,
                    where: {
                        is_deleted: false,
                        status: {
                            [Op.ne]: 5
                        },
                        [Op.or]: [
                            {
                                start_date: {
                                    [Op.between]: [start_date, end_date],
                                }
                            },
                            {
                                end_date: {
                                    [Op.between]: [start_date, end_date],
                                }
                            },
                            {
                                start_date: {
                                    [Op.lte]: start_date,
                                },
                                end_date: {
                                    [Op.gte]: end_date,
                                },
                            }
                        ]
                    }
                }
            ]
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
