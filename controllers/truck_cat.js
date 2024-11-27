const router = require("express").Router();
const { TruckCatModel } = require("../models");
const { Op } = require("sequelize");

router.get("/list", async (req, res) => {
    console.log(req.query);
    const { name } = req.query;
    let $query = {};
    if (name != undefined) {
        $query = {
            name: {
                [Op.like]: `%${name}%`
            }
        }
    }

    let totalCount = await TruckCatModel.count({
        where: $query,
        attributes: ["id", "name"]
    });

    let results = await TruckCatModel.findAll({
        where: $query,
        attributes: ["id", "name"]
    });

    return res.send({
        totalCount,
        results
    });
});

router.get("/detail", async (req, res) => {
    let { id } = req.query;
    try {
        let result = await TruckCatModel.findOne({
            where: {
                id: id
            },
            attributes: ["id", "name"]
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
        let result = await TruckCatModel.create({
            name: name,
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
        let result = await TruckCatModel.findOne({
            where: {
                id: id
            }
        });
        if (!result)
            return res.sendStatus(404);
        if (name !== undefined) {
            result.name = name;
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
        let result = await TruckCatModel.findOne({
            where: {
                id: id
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
