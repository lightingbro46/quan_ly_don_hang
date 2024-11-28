const router = require("express").Router();
const { UserModel } = require("../models");

router.get("/list", async (req, res) => {
    console.log(req.query);
    try {
        let totalCount = await UserModel.count({
            where: {
                is_deleted: false
            }
        });
        let results = await UserModel.findAll({
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
        let result = await UserModel.findOne({
            where: {
                id: id
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
    let {
        fullname,
        identification,
        gender,
        birthday,
        position,
        address,
        phone_number,
        username,
        password,
        is_admin,
        start_date
    } = req.body;
    try {
        let result = await UserModel.create({
            fullname: fullname,
            identification: identification,
            gender: gender,
            birthday: birthday,
            address: address,
            phone_number: phone_number,
            position: position,
            start_date: start_date,
            end_date: null,
            username: username,
            password: password,
            is_admin: is_admin,
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
    let { fullname, identification, gender, birthday, position, address, phone_number, start_date, end_date, status, username, password } = req.body;
    try {
        let result = await UserModel.findOne({
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
        if (identification !== undefined) {
            result.identification = identification;
        }
        if (gender !== undefined) {
            result.gender = gender;
        }
        if (birthday !== undefined) {
            result.birthday = birthday;
        }
        if (position !== undefined) {
            result.position = position;
        }
        if (address !== undefined) {
            result.address = address;
        }
        if (phone_number !== undefined) {
            result.phone_number = phone_number;
        }
        if (start_date !== undefined) {
            result.start_date = start_date;
        }
        if (end_date !== undefined) {
            result.end_date = end_date;
        }
        if (username !== undefined) {
            result.username = username;
        }
        if (password !== undefined) {
            result.password = password;
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
        let result = await UserModel.findOne({
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

router.post("/login", async (req, res) => {
    let { username, password } = req.body;
    try {
        let result = await UserModel.findOne({
            where: {
                username: username,
                password: password,
                status: 1,
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
