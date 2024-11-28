const router = require("express").Router();
const { CostModel } = require("../models");
const { Op } = require("sequelize");

router.get("/list", async (req, res) => {
    console.log(req.query);
    const { q } = req.query;
    let $query = {}

    if (q != undefined) {
        $query[Op.or] = {
            province: {
                [Op.like]: `%${q}%`
            },  
            arrival: {
                [Op.like]: `%${q}%`
            }
        }
    }

    try {
        let totalCount = await CostModel.count({
            where: {
                is_deleted: false,
                ...$query
            }
        })
        let results = await CostModel.findAll({
            where: {
                is_deleted: false,
                ...$query
            }
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
        let result = await CostModel.findOne({
            where: {
                id: id,
                is_deleted: false
            }
        });
        if (!result)
            return res.sendStatus(404)
        return res.send(result);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
});

router.post("/add", async (req, res) => {
    let { province, arrival, pricing, tolls } = req.body;
    try {
        let result = await CostModel.create({
            province: province,
            arrival: arrival,
            pricing: pricing,
            tolls: tolls,
        });
        return res.send(result);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
});

router.post("/update", async (req, res) => {
    let { id } = req.query;
    let { province, arrival, pricing, tolls } = req.body;
    try {
        let result = await CostModel.findOne({
            where: {
                id: id,
                is_deleted: false
            }
        });

        if (!result)
            return res.sendStatus(404);

        if (province !== undefined) {
            result.province = province;
        }
        if (arrival !== undefined) {
            result.arrival = arrival;
        }
        if (pricing !== undefined) {
            result.pricing = pricing;
        }
        if (tolls !== undefined) {
            result.tolls = tolls;
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
        let result = await CostModel.findOne({
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
