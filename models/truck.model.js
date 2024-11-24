const { DataTypes, Sequelize, Model } = require('sequelize');

module.exports = {
    /**
     * @param {Sequelize} sequelize 
     * @param {Model} TruckCatsModel 
     * @returns
     */
    defineTruckModel: (sequelize, TruckCatsModel) => {
        const TruckModel = sequelize.define('TRUCKS', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            cat_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: TruckCatsModel,
                    key: "id"
                },
                allowNull: false
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            license_plate: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            status: {
                type: DataTypes.TINYINT,
                defaultValue: 1,
                /**
                 * 1: Đang làm việc
                 * 2: Bảo dưỡng, loại bỏ
                 */
            },
            is_deleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        }, {
            timestamps: true,
            tableName: "TRUCKS"
        });
        return TruckModel;
    }
}