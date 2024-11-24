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
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            departure: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            arrival: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            material: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            weight: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            start_date: {
                type: DataTypes.DATE,
                allowNull: false
            },
            end_date: {
                type: DataTypes.DATE,
                allowNull: false
            },
            truck_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: TrucksModel,
                    key: "truck_id"
                }
            },
            driver_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: DriversModel,
                    key: "driver_id"
                }
            },
            customer_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: CustomersModel,
                    key: "customer_id"
                }
            },
            pricing: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            tolls: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            status: {
                type: DataTypes.TINYINT,
                defaultValue: 1,
                /**
                 * 1: Đã tiếp nhận
                 * 2: Đã huỷ đơn
                 */
            },
            deliver_status: {
                type: DataTypes.TINYINT,
                defaultValue: 1,
                /**
                 * 1: Chờ vận chuyển
                 * 2: Đang vận chuyển
                 * 3: Đã trả hàng
                 */
            },
            payment_status: {
                type: DataTypes.TINYINT,
                defaultValue: 1,
                /**
                 * 1: Chưa thanh toán
                 * 2: Đã thanh toán 
                 */
            },
            is_deleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        }, {
            timestamps: true,
            tableName: "ORDERS"
        });

        return OrderModel;
    }
} 