const { DataTypes, Sequelize, Model } = require('sequelize');

module.exports = {
    /**
     * @param {Sequelize} sequelize 
     * @param {Model} TruckModel 
     * @param {Model} OrderModel 
     * @returns 
     */
    defineTruckTimelineModel: (sequelize, TruckModel, OrderModel) => {
        const TruckTimelineModel = sequelize.define('TRUCK_TIMELINES', {
            TIMELINE_ID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            TIMELINE_DRIVER_ID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: TruckModel,
                    key: "TRUCK_ID"
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
            tableName: "TRUCK_TIMELINES"
        });
        return TruckTimelineModel;
    }
}