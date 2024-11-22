const { DataTypes, Sequelize, Model } = require('sequelize');

module.exports = {
    /**
     * @param {Sequelize} sequelize 
     * @returns
     */
    defineTruckCatModel: (sequelize) => {
        const TrunkCatModel = sequelize.define('TRUCK_CATS', {
            TRUCK_CAT_ID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            TRUCK_CAT_NAME: {
                type: DataTypes.TEXT,
                allowNull: false,
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
            { TRUCK_CAT_ID: 1, TRUCK_CAT_NAME: "Loại xe cont 20 tấn" },
            { TRUCK_CAT_ID: 2, TRUCK_CAT_NAME: "Loại xe cont 40 tấn" },
            { TRUCK_CAT_ID: 3, TRUCK_CAT_NAME: "Loại xe cont 45 tấn" },
        ];
        await TruckCatModel.bulkCreate(TruckCatData, { updateOnDuplicate: ['TRUCK_CAT_ID'] });
        console.log("Insert truck catalog success");
    }
}