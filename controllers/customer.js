const router = require("express").Router();
const { CustomerModel, CustomersModel } = require("../models");
const { Op } = require("sequelize");

router.get("/list", async (req, res) => {
    console.log(req.query);
    return res.send({
        totalCount: 2,
        results: [{
            id: 1,
            name: "Nguyễn Văn A",
            company: "Công ty 1",
            tax: "111111",
            address: "Hà Nội",
            phone: "09822828282",
            email: "nguyenvana@gmail.com",
        },
        {
            id: 2,
            name: "Nguyễn Văn B",
            company: "Công ty 2",
            tax: "1111112",
            address: "Hải Phòng",
            phone: "09727277227",
            email: "nguyenvanb@gmail.com",
        },]
    });
    try {
        const query = req.query;
        let $query = {};
        if (query.query_string != undefined) {
            $query = {
                [Op.or]: [{
                    CUSTOMER_NAME: {
                        [Op.like]: `%${query_string}%`
                    }
                }, {
                    CUSTOMER_COMPANY: {
                        [Op.like]: `%${query_string}%`
                    }
                }, {
                    CUSTOMER_ADDRESS: {
                        [Op.like]: `%${query_string}%`
                    }
                }, {
                    CUSTOMER_PHONE: {
                        [Op.like]: `%${query_string}%`
                    }
                }, {
                    CUSTOMER_EMAIL: {
                        [Op.like]: `%${query_string}%`
                    }
                }],
            }
        }
        let result = await Customer.findAll({
            where: $query
        });
        return res.send(result);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
});

router.get("/detail", async (req, res) => {
    let query = req.query;
    try {
        let result = await Customer.findOne({
            where: {
                CUSTOMER_ID: query.id
            }
        });
        return res.send(result);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
});

router.post("/add", async (req, res) => {
    let {name, company, tax, address, phone, email} = req.body;
    try {
        let result = await Customer.create({
            CUSTOMER_NAME: name,
            CUSTOMER_COMPANY: company,
            CUSTOMER_TAX: tax,
            CUSTOMER_ADDRESS: address,
            CUSTOMER_PHONE: phone,
            CUSTOMER_EMAIL: email,
        });
        return res.send(result);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }

});

router.post("/update", async (req, res) => {
    let {id} = req.query;
    let {name, company, tax, address, phone, email} = req.body;
    try {
        let result = await CustomersModel.findOne({
            where: {
                CUSTOMER_ID: id
            }
        });
        if (name !== undefined) {
            result.CUSTOMER_NAME = name;
        }
        if (company !== undefined) {
            result.CUSTOMER_COMPANY = company;
        }
        if (tax !== undefined) {
            result.CUSTOMER_TAX = tax;
        }
        if (address !== undefined) {
            result.CUSTOMER_ADDRESS = address;
        }
        if (phone !== undefined) {
            result.CUSTOMER_PHONE = phone;
        }
        if (email !== undefined) {
            result.CUSTOMER_EMAIL = email;
        }
        await result.save();
        return res.send(result);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
});

router.get("/delete", async (req, res) => {
    let {id} = req.query;
    try {
        let result = await Customer.destroy({
            where: {
                CUSTOMER_ID: id
            }
        });
        return res.sendStatus(200);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
});

module.exports = router;
