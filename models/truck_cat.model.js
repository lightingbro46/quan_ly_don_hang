const { DataTypes, Sequelize, Model } = require('sequelize');

module.exports = {
    /**
     * @param {Sequelize} sequelize 
     * @returns
     */
    defineTruckCatModel: (sequelize) => {
        const TrunkCatModel = sequelize.define('TRUCK_CATS', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            is_deleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        }, {
            timestamps: true,
            tableName: "TRUCK_CATS"
        });
        return TrunkCatModel;
    },
    /**
     * @param {Model} TruckCatModel 
     * @returns
     */
    insertTruckCatData: async (TruckCatModel) => {
        const TruckCatData = [
            { id: 1, name: "Loại xe cont 20" },
            { id: 2, name: "Loại xe cont 40" },
            { id: 3, name: "Loại xe cont 45" },
        ];
        await TruckCatModel.bulkCreate(TruckCatData, { updateOnDuplicate: ['id'] });
        console.log("Insert truck catalog success");
    }
}