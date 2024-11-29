const { DataTypes, Sequelize, Model } = require('sequelize');

module.exports = {
    /**
     * @param {Sequelize} sequelize 
     * @returns
     */
    defineTruckModel: (sequelize) => {
        const TruckModel = sequelize.define('TRUCKS', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            cat_id: {
                type: DataTypes.INTEGER,
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
                 * 1: Sẵn sàng
                 * 2: Đang vận chuyển
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

        TruckModel.associations = ({ OrderModel, TruckCatModel }) => {
            TruckModel.hasMany(OrderModel, { foreignKey: "truck_id", as: "orders" });
            TruckModel.belongsTo(TruckCatModel, { foreignKey: "cat_id", as: "truck_cat" });
        }

        return TruckModel;
    }
}