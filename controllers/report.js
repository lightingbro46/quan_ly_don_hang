const router = require("express").Router();
const { CustomerModel, OrderModel, DriverModel, UserModel, TruckModel } = require("../models");
const { Op } = require('sequelize');

router.get("/overview", async (req, res) => {
    const customer_count = await CustomerModel.count({
        where: {
            is_deleted: false,
        }
    });
    const order_count = await OrderModel.count({
        where: {
            is_deleted: false,
        }
    });
    const driver_count = await DriverModel.count({
        where: {
            is_deleted: false,
        }
    });
    const user_count = await UserModel.count({
        where: {
            is_deleted: false,
        }
    });
    const truck_count = await TruckModel.count({
        where: {
            is_deleted: false,
        }
    });
    const truck_unavailable_count = await TruckModel.count({
        where: {
            is_deleted: false,
            status: 3
        }
    });
    return res.send({
        totalCount: {
            customer: customer_count,
            order: order_count,
            driver: driver_count,
            user: user_count,
            truck: truck_count,
            truck_unavailable: truck_unavailable_count,
        }
    });
});

router.get("/revenue", async (req, res) => {
    console.log(req.query)
    const { period, start_date, end_date } = req.query;
    try {
        if (!period || !start_date || !end_date)
            return res.sendStatus(400);

        let results = await OrderModel.findAll({
            where: {
                is_deleted: false,
                status: 4,
                payment_status: 2,
                end_date: {
                    [Op.between]: [start_date, end_date],
                }
            }
        })

        let revenue = 0;
        let cost = 0;
        let profits = 0;
        let tax = 0;
        let profitsAfterTax = 0;
        results.forEach(val => {
            revenue += val.pricing;
            cost += val.tolls;
        })
        profits = revenue - cost;
        tax = profits * 20 / 100;
        profitsAfterTax = profits - tax;
        return res.send(
            [
                {
                    id: 1,
                    key: "Doanh thu bán hàng và cung cấp dịch vụ",
                    value: revenue
                },
                {
                    id: 2,
                    key: "Các khoản giảm trừ doanh thu",
                    value: 0
                },
                {
                    id: 3,
                    key: "Giá vốn hàng bán",
                    value: cost
                },
                {
                    id: 4,
                    key: "Lợi nhuận gộp về bán hàng và cung cấp dịch vụ",
                    value: profits
                },
                {
                    id: 5,
                    key: "Thuế thu nhập doanh nghiệp",
                    value: tax
                },
                {
                    id: 6,
                    key: "Lợi nhuận sau thuế thu nhập doanh nghiệp",
                    value: profitsAfterTax
                },
            ]
        );
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

router.get("/award", async (req, res) => {
    console.log(req.query)
    const { period, start_date, end_date, target } = req.query;
    try {
        if (!period || !start_date || !end_date || !target)
            return res.sendStatus(400);

        let results = await DriverModel.findAll({
            where: {
                is_deleted: false,
                status: {
                    [Op.ne]: 3
                }
            },
            attributes: ["id", "name", "identification"],
            include: [
                {
                    model: OrderModel,
                    as: "orders",
                    where: {
                        is_deleted: false,
                        status: 4,
                        end_date: {
                            [Op.between]: [start_date, end_date],
                        }
                    },

                }
            ],
        })
        return res.send(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

module.exports = router;