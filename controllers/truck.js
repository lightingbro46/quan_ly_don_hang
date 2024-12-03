const router = require("express").Router();
const { TruckModel, OrderModel } = require("../models");
const { Op } = require("sequelize");

router.get("/list", async (req, res) => {
    console.log(req.query);
    const { name, license_plate, cat_id, status } = req.query;
    let $query = {};
    if (name) {
        $query.name = {
            [Op.like]: `%${name}%`
        }
    }
    if (license_plate) {
        $query.license_plate = {
            [Op.like]: `%${license_plate}%`
        }
    }
    if (cat_id) {
        $query.cat_id = cat_id;
    }
    if (status) {
        $query.status = status;
    }
    let totalCount = await TruckModel.count({
        where: {
            is_deleted: false,
            ...$query
        },
    });

    let results = await TruckModel.findAll({
        where: {
            is_deleted: false,
            ...$query
        },
    });
    return res.send({
        totalCount,
        results
    });
});

router.get("/detail", async (req, res) => {
    let { id } = req.query;
    try {
        let result = await TruckModel.findOne({
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
    let { name, license_plate, cat_id } = req.body;
    try {
        let result = await TruckModel.create({
            name: name,
            license_plate: license_plate,
            cat_id: cat_id,
            status: 1
        });
        return res.send(result);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
});

router.post("/update", async (req, res) => {
    let { id } = req.query;
    let { name, license_plate, cat_id, status } = req.body;
    try {
        let result = await TruckModel.findOne({
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
        if (license_plate !== undefined) {
            result.license_plate = license_plate;
        }
        if (cat_id !== undefined) {
            result.cat_id = cat_id;
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
        let result = await TruckModel.findOne({
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
    console.log(req.body)
    let { start_date, end_date, cat_id, q } = req.body;
    if (!start_date || !end_date || !cat_id)
        return res.sendStatus(400);

    let $query = {}
    if (q != undefined) {
        $query[Op.or] = [
            {
                name: {
                    [Op.like]: `%${q}%`
                }
            },
            {
                license_plate: {
                    [Op.like]: `%${q}%`
                },

            }
        ]
    }
    if (cat_id != undefined) {
        $query.cat_id = cat_id;
    }

    try {
        let countTotal = await TruckModel.count({
            where: {
                status: 1,
                is_deleted: false,
                "$ORDERS.id$": null,
                ...$query
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
        let results = await TruckModel.findAll({
            where: {
                status: 1,
                is_deleted: false,
                "$ORDERS.id$": null,
                ...$query
            },
            attributes: ["id", "name", "license_plate"],
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
