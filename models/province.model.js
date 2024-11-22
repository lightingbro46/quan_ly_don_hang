const { DataTypes, Sequelize, Model } = require('sequelize');

module.exports = {
    /**
     * @param {Sequelize} sequelize 
     * @returns
     */
    defineProvinceModel: (sequelize) => {
        const ProvincesModel = sequelize.define('PROVINCES', {
            PROVINCE_ID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            PROVINCE_NAME: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        }, {
            timestamps: true,
            tableName: "PROVINCES"
        });
        return ProvincesModel;
    },
    /**
     * @param {Model} ProvinceModel 
     * @returns
     */
    insertProvinceData: async (ProvinceModel) => {
        const ProvinceData = [
            { PROVINCE_ID: 1, PROVINCE_NAME: "Hải Phòng" },
            { PROVINCE_ID: 2, PROVINCE_NAME: "Hải Dương" },
            { PROVINCE_ID: 3, PROVINCE_NAME: "Hưng Yên" },
            { PROVINCE_ID: 4, PROVINCE_NAME: "Hà Nội" },
            { PROVINCE_ID: 5, PROVINCE_NAME: "Nam Định" },
            { PROVINCE_ID: 6, PROVINCE_NAME: "Bắc Ninh" },
            { PROVINCE_ID: 7, PROVINCE_NAME: "Bắc Giang" },
            { PROVINCE_ID: 8, PROVINCE_NAME: "Quảng Ninh" },
            { PROVINCE_ID: 9, PROVINCE_NAME: "Lạng Sơn" },
            { PROVINCE_ID: 10, PROVINCE_NAME: "Vĩnh Phúc" },
            { PROVINCE_ID: 11, PROVINCE_NAME: "Phú Thọ" },
            { PROVINCE_ID: 12, PROVINCE_NAME: "Yên Bái" },
            { PROVINCE_ID: 13, PROVINCE_NAME: "Thái Nguyên" },
            { PROVINCE_ID: 14, PROVINCE_NAME: "Bắc Kạn" },
            { PROVINCE_ID: 15, PROVINCE_NAME: "Tuyên Quang" },
            { PROVINCE_ID: 16, PROVINCE_NAME: "Hà Giang" },
            { PROVINCE_ID: 17, PROVINCE_NAME: "Thanh Hoá" },
            { PROVINCE_ID: 18, PROVINCE_NAME: "Thái Bình" },
            { PROVINCE_ID: 19, PROVINCE_NAME: "Hà Nam" },
            { PROVINCE_ID: 20, PROVINCE_NAME: "Ninh Bình" },
            { PROVINCE_ID: 21, PROVINCE_NAME: "Nghệ An" },
            { PROVINCE_ID: 22, PROVINCE_NAME: "Hà Tĩnh" },
            { PROVINCE_ID: 23, PROVINCE_NAME: "Lào Cai" },
            { PROVINCE_ID: 24, PROVINCE_NAME: "Hoà Bình" },
            { PROVINCE_ID: 25, PROVINCE_NAME: "Cao Bằng" },
        ];
        await ProvinceModel.bulkCreate(ProvinceData, { updateOnDuplicate: ["PROVINCE_ID"] });
        console.log("Insert province data success");
    }
}