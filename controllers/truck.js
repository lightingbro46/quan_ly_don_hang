const router = require("express").Router();
const { TruckModel } = require("../models");
const { Op } = require("sequelize");

router.get("/list", async (req, res) => {
    console.log(req.query);
    const { name, license_plate, cat_id, status } = req.query;
    let $query = {
        is_deleted :false
    };
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
        where: $query,
    });

    let results = await TruckModel.findAll({
        where: $query
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
                id: id
            }
        });
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
                id: id
            }
        });
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
    console.log("id", id)
    try {
        let result = await TruckModel.findOne({
            where: {
                id: id,
            }
        });
        if (result) {
            result.is_deleted = true;
            await result.save();
            return res.sendStatus(200);
        } else {
            return res.sendStatus(404);
        }
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
});

module.exports = router;
