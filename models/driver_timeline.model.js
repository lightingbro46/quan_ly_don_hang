const { DataTypes, Sequelize, Model } = require('sequelize');

module.exports = {
    /**
     * @param {Sequelize} sequelize 
     * @param {Model} DriverModel 
     * @param {Model} OrderModel 
     * @returns 
     */
    defineDriverTimelineModel: (sequelize, DriverModel, OrderModel) => {
        const DriverTimelineModel = sequelize.define('DRIVER_TIMELINES', {
            TIMELINE_ID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            TIMELINE_DRIVER_ID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: DriverModel,
                    key: "DRIVER_ID"
                }
            },
            TIMELINE_ORDER_ID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: OrderModel,
                    key: "ORDER_ID"
                }
            },
            TIMELINE_START_TIME: {
                type: DataTypes.DATE,
                allowNull: false
            },
            TIMELINE_END_TIME: {
                type: DataTypes.DATE,
                allowNull: false
            },
            TIMELINE_STATUS: {
                type: DataTypes.TINYINT,
                defaultValue: 1
                /**
                 * 1: Đặt lịch
                 * 2: Huỷ lịch
                 */
            },
        }, {
            timestamps: true,
            tableName: "DRIVER_TIMELINES"
        });
        return DriverTimelineModel;
    }
}