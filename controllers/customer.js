const router = require("express").Router();
const { CustomerModel } = require("../models");

router.get("/list", async (req, res) => {
    console.log(req.query);
    try {
        let totalCount = await CustomerModel.count({
            where: {
                is_deleted: false
            }
        });

        let results = await CustomerModel.findAll({
            where: {
                is_deleted: false
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
        let result = await CustomerModel.findOne({
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
    let { name, identification, company, tax, address, phone_number, email } = req.body;
    try {
        let result = await CustomerModel.create({
            name: name,
            identification: identification,
            company: company,
            tax: tax,
            address: address,
            phone_number: phone_number,
            email: email,
        });
        return res.send(result);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }

});

router.post("/update", async (req, res) => {
    let { id } = req.query;
    let { name, identification, company, tax, address, phone_number, email } = req.body;
    try {
        let result = await CustomerModel.findOne({
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
        if (company !== undefined) {
            result.company = company;
        }
        if (tax !== undefined) {
            result.tax = tax;
        }
        if (address !== undefined) {
            result.address = address;
        }
        if (phone_number !== undefined) {
            result.phone_number = phone_number;
        }
        if (email !== undefined) {
            result.email = email;
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
        let result = await CustomerModel.findOne({
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
