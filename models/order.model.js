const { DataTypes, Sequelize } = require('sequelize');

module.exports = {
    /**
     * @param {Sequelize} sequelize 
     * @param {Model} CustomersModel 
     * @param {Model} TrucksModel 
     * @param {Model} DriversModel 
     * @returns 
     */
    defineOrderModel: (sequelize, CustomersModel, TrucksModel, DriversModel) => {
        const OrderModel = sequelize.define('ORDERS', {
            ORDER_ID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            ORDER_DEPARTURE: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            ORDER_ARRIVAL: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            ORDER_MATERIAL: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            ORDER_TOTAL_WEIGHT: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            ORDER_START_DATE: {
                type: DataTypes.DATE,
                allowNull: false
            },
            ORDER_END_DATE: {
                type: DataTypes.DATE,
                allowNull: false
            },
            ORDER_TRUCK_ID: {
                type: DataTypes.INTEGER,
                references: {
                    model: TrucksModel,
                    key: "TRUCK_ID"
                }
            },
            ORDER_DRIVER_ID: {
                type: DataTypes.INTEGER,
                references: {
                    model: DriversModel,
                    key: "DRIVER_ID"
                }
            },
            ORDER_CUSTOMER_ID: {
                type: DataTypes.INTEGER,
                references: {
                    model: CustomersModel,
                    key: "CUSTOMER_ID"
                }
            },
            ORDER_PRICING: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            ORDER_COST: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            ORDER_STATUS: {
                type: DataTypes.INTEGER,
                defaultValue: 1,
                /**
                 * 1: Đã tiếp nhận
                 * 2: Đang vận chuyển
                 * 3: Đã trả hàng
                 * 4: Đã huỷ đơn
                 */
            },
            ORDER_PAYMENT_STATUS: {
                type: DataTypes.INTEGER,
                defaultValue: 1,
                /**
                 * 1: Chưa thanh toán
                 * 2: Đã thanh toán 
                 */
            },
        }, {
            timestamps: true,
            tableName: "ORDERS"
        });

        return OrderModel;
    }
} 