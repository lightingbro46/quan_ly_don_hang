const { DataTypes, Sequelize } = require('sequelize');

module.exports = {
    /**
     * @param {Sequelize} sequelize 
     * @returns 
     */
    defineDriverModel: (sequelize) => {
        const DriverModel = sequelize.define('DRIVERS', {
            DRIVER_ID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            DRIVER_NAME: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            DRIVER_PHONE: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            DRIVER_GENDER: {
                type: DataTypes.TINYINT,
                allowNull: false
                /**
                 * 1: Nam
                 * 2: Nữ
                 */
            },
            DRIVER_STATUS: {
                type: DataTypes.TINYINT,
                defaultValue: 1
                /**
                 * 1: Đang làm việc
                 * 2: Nghỉ việc
                 */
            },
        }, {
            timestamps: true,
            tableName: "DRIVERS"
        });
        return DriverModel;
    }
}