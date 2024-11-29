const { DataTypes, Sequelize } = require('sequelize');

module.exports = {
    /**
     * @param {Sequelize} sequelize 
     * @returns 
     */
    defineOrderModel: (sequelize) => {
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
                allowNull: false
            },
            driver_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            customer_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false
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
                 * 2: Đang lấy hàng
                 * 3: Đang vận chuyển
                 * 4: Đã trả hàng
                 * 5: Đã huỷ đơn
                 */
            },
            payment_status: {
                type: DataTypes.TINYINT,
                defaultValue: 1,
                /**
                 * 1: Chưa thanh toán
                 * 2: Đã thanh toán 
                 * 3: Đã hoàn tiền
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


        OrderModel.associations = ({ CustomerModel, TruckModel, DriverModel, UserModel }) => {
            OrderModel.belongsTo(CustomerModel, { foreignKey: "customer_id", as: "customer" });
            OrderModel.belongsTo(TruckModel, { foreignKey: "truck_id", as: "truck" });
            OrderModel.belongsTo(DriverModel, { foreignKey: "driver_id", as: "driver" });
            OrderModel.belongsTo(UserModel, { foreignKey: "user_id", as: "user" });
        }

        return OrderModel;
    }
} 