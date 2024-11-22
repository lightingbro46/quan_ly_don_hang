const { DataTypes, Sequelize, Model } = require('sequelize');

module.exports = {
    /**
     * @param {Sequelize} sequelize 
     * @param {Model} TruckCatsModel 
     * @returns
     */
    defineTruckModel: (sequelize, TruckCatsModel) => {
        const TruckModel = sequelize.define('TRUCKS', {
            TRUCK_ID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            TRUCK_CAT_ID: {
                type: DataTypes.INTEGER,
                references: {
                    model: TruckCatsModel,
                    key: "TRUCK_CAT_ID"
                },
                allowNull: false
            },
            TRUCK_LICENSE_PLATE: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            TRUCK_STATUS: {
                type: DataTypes.TINYINT,
                defaultValue: 1,
                /**
                 * 1: Đang làm việc
                 * 2: Bảo dưỡng, loại bỏ
                 */
            },
        }, {
            timestamps: true,
            tableName: "TRUCKS"
        });
        return TruckModel;
    }
}