const router = require("express").Router();
const { UserModel } = require("../models");
const { Op } = require("sequelize");

router.get("/list", async (req, res) => {
    console.log(req.query);
    try {
        let totalCount = await UserModel.count({
            where: {
                is_deleted: false
            }
        });
        let result = await UserModel.findAll({
            where: {
                is_deleted: false
            }
        });
        return res.send({
            totalCount,
            result
        });
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
});

router.get("/detail", async (req, res) => {
    let { id } = req.query;
    try {
        let result = await UserModel.findOne({
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
    let { fullname, gender, birthday, company, position, tax, address, phone_number, email, username, password } = req.body;
    try {
        let result = await UserModel.create({
            fullname: fullname,
            gender: gender,
            birthday: birthday,
            postionce: birthday,
            company: company,
            tax: tax,
            address: address,
            phone_number: phone_number,
            email: email,
            position: position,
            start_date: start_date,
            end_start: end_start,
            username: username,
            password: password,
        });
        return res.send(result);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
});

router.post("/update", async (req, res) => {
    let { id } = req.query;
    let { fullname, gender, birthday, company, position, tax, address, phone_number, email, username, password } = req.body;
    try {
        let result = await UserModelsModel.findOne({
            where: {
                id: id,
                is_deleted: false
            }
        });
        if (!result)
            return res.sendStatus(404);

        if (fullname !== undefined) {
            result.fullname = fullname;
        }
        if (gender !== undefined) {
            result.gender = gender;
        }
        if (birthday !== undefined) {
            result.birthday = birthday;
        }
        if (company !== undefined) {
            result.company = company;
        }
        if (position !== undefined) {
            result.position = position;
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
        if (username !== undefined) {
            result.username = username;
        }
        if (password !== undefined) {
            result.password = password;
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
        let result = await UserModel.findOne({
            where: {
                id: id,
                is_deleted: false
            }
        });
        result.is_deleted = true;
        await result.save();
        return res.sendStatus(200);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
});

router.post("/login", async (req, res) => {
    let { username, password } = req.body;
    try {
        let result = await UserModel.findOne({
            where: {
                username: username,
                password: password,
                is_deleted: false,
            }
        });
        return result ?
            res.send({ user: result }) :
            res.sendStatus(404);

    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
});

module.exports = router;
