const { DataTypes, Sequelize } = require('sequelize');

module.exports = {
    /**
     * @param {Sequelize} sequelize 
     * @param {Model} CustomersModel 
     * @param {Model} TrucksModel 
     * @param {Model} DriversModel 
     * @returns 
     */
    defineOrderModel: (sequelize, CustomerModel, TruckModel, DriverModel, UserModel) => {
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
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            end_date: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            truck_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: TruckModel,
                    key: "id"
                }
            },
            driver_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: DriverModel,
                    key: "id"
                }
            },
            customer_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: CustomerModel,
                    key: "id"
                }
            },
            user_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: UserModel,
                    key: "id"
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