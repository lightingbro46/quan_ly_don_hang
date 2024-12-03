const { DataTypes, Sequelize } = require('sequelize');

module.exports = {
    /**
     * @param {Sequelize} sequelize 
     * @returns 
     */
    defineDriverModel: (sequelize) => {
        const DriverModel = sequelize.define('DRIVERS', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            identification: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            birthday: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            phone_number: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            gender: {
                type: DataTypes.TINYINT,
                allowNull: false
                /**
                 * 1: Nam
                 * 2: Nữ
                 */
            },
            status: {
                type: DataTypes.TINYINT,
                defaultValue: 1
                /**
                 * 1: Sẵn sàng
                 * 2: Đang vận chuyển
                 * 3: Nghỉ việc
                 */
            },
            is_deleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        }, {
            timestamps: true,
            tableName: "DRIVERS"
        });

        DriverModel.associations = ({OrderModel}) => {
            DriverModel.hasMany(OrderModel, { foreignKey: "driver_id", as:"orders" });
        }

        return DriverModel;
    }
}