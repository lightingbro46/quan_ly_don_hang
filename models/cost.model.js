const { DataTypes, Sequelize, Model } = require('sequelize');

module.exports = {
    /**
     * @param {Sequelize} sequelize 
     * @param {Model} ProvincesModel 
     * @param {Model} TruckCatsModel 
     * @returns
     */
    defineCostModel: (sequelize, ProvincesModel, TruckCatsModel) => {
        const CostModel = sequelize.define('COSTS', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            province: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            arrival: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            pricing: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            tolls: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            is_deleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        }, {
            timestamps: true,
            tableName: "COSTS"
        });
        return CostModel;
    },

    /**
     * @param {Model} CostModel 
     * @returns
     */
    insertCostData: async (CostModel) => {
        const CostData = [
            { id: 1, province: "Hải Phòng", arrival: "226 Lê Lai, HP", pricing: 1300000, tolls: 200000 },
            { id: 2, province: "Hải Phòng", arrival: "Cát Bi, Nguyễn Văn Linh", pricing: 1500000, tolls: 200000 },
            { id: 3, province: "Hải Phòng", arrival: "Đình Vũ, HP", pricing: 1200000, tolls: 200000 },
            { id: 4, province: "Hải Phòng", arrival: "Ninh Hải, HP", pricing: 1600000, tolls: 200000 },
            { id: 5, province: "Hải Phòng", arrival: "KCN Đồ Sơn, HP", pricing: 1700000, tolls: 200000 },
            { id: 6, province: "Hải Phòng", arrival: "Cơ Khí Duyên Hải, Quán Toan, HP", pricing: 1600000, tolls: 200000 },
            { id: 7, province: "Hải Phòng", arrival: "Cầu Kiền - Quán Toan, HP", pricing: 1700000, tolls: 200000 },
            { id: 8, province: "Hải Phòng", arrival: "Cảng Vật Cách, HP", pricing: 1700000, tolls: 200000 },
            { id: 9, province: "Hải Phòng", arrival: "Cao Đẳng Duyên Hải, Kiến An,HP", pricing: 1700000, tolls: 200000 },
            { id: 10, province: "Hải Phòng", arrival: "Trần Tất Văn, Kiến An, HP", pricing: 1700000, tolls: 200000 },
            { id: 11, province: "Hải Phòng", arrival: "Gia Minh, Thuỷ Nguyên", pricing: 2000000, tolls: 200000 },
            { id: 12, province: "Hải Phòng", arrival: "Đông Sơn, Thuỷ Nguyên, HP", pricing: 1900000, tolls: 200000 },
            { id: 13, province: "Hải Phòng", arrival: "An Lão,Thái Sơn, HP", pricing: 1900000, tolls: 200000 },
            { id: 14, province: "Hải Phòng", arrival: "Cát Đá, Kiến An, HP", pricing: 1700000, tolls: 200000 },
            { id: 15, province: "Hải Phòng", arrival: "Chợ Hương, Kiến An, HP", pricing: 1600000, tolls: 200000 },
            { id: 16, province: "Hải Dương", arrival: "CCN Thạch Khôi - tp Hải Dương", pricing: 2600000, tolls: 300000 },
            { id: 17, province: "Hải Dương", arrival: "Kim Thành, Hải Dương", pricing: 2600000, tolls: 300000 },
            { id: 18, province: "Hải Dương", arrival: "Thanh Hà, Hải Dương", pricing: 2700000, tolls: 300000 },
            { id: 19, province: "Hải Dương", arrival: "Phú Thái, Hải Dương", pricing: 2600000, tolls: 300000 },
            { id: 20, province: "Hải Dương", arrival: "Phú Thái, Hải Dương qua trạm thu phí ", pricing: 2900000, tolls: 300000 },
            { id: 21, province: "Hải Dương", arrival: "Ga Phạm Xá", pricing: 2600000, tolls: 300000 },
            { id: 22, province: "Hải Dương", arrival: "Sặt, Cẩm Giàng", pricing: 2900000, tolls: 300000 },
            { id: 23, province: "Hải Dương", arrival: "Tân Hồng , Quán Gỏi", pricing: 2900000, tolls: 300000 },
            { id: 24, province: "Hải Dương", arrival: "Gia Lộc", pricing: 2900000, tolls: 300000 },
            { id: 25, province: "Hải Dương", arrival: "Ga Tiền Trung, Kinh Môn, Tp Hải Dương", pricing: 2700000, tolls: 300000 },
            { id: 26, province: "Hải Dương", arrival: "559, Hải Dương, An Châu, KCN Đại An", pricing: 2800000, tolls: 300000 },
            { id: 27, province: "Hải Dương", arrival: "Phú Lương", pricing: 2800000, tolls: 300000 },
            { id: 28, province: "Hưng Yên", arrival: "Văn Giang - Hưng yên", pricing: 3200000, tolls: 300000 },
            { id: 29, province: "Hưng Yên", arrival: "KCN Tân Quang, Hưng yên", pricing: 3500000, tolls: 300000 },
            { id: 30, province: "Hưng Yên", arrival: "Mỹ Hào, Hưng Yên", pricing: 3100000, tolls: 300000 },
            { id: 31, province: "Hưng Yên", arrival: "Bạch Sam Hưng Yên", pricing: 3100000, tolls: 300000 },
            { id: 32, province: "Hưng Yên", arrival: "Phố Nối, Hưng Yên", pricing: 3100000, tolls: 300000 },
            { id: 33, province: "Hưng Yên", arrival: "Như Quỳnh, Hưng Yên", pricing: 3600000, tolls: 300000 },
            { id: 34, province: "Hưng Yên", arrival: "Văn Lâm, Hưng Yên", pricing: 3500000, tolls: 300000 },
            { id: 35, province: "Hưng Yên", arrival: "Lạc Đạo, Hưng Yên", pricing: 3600000, tolls: 300000 },
            { id: 36, province: "Hà Nội", arrival: "Thường Tín, Hà Bình Phương, Hà Tây, Cầu chiếc, Văn bình", pricing: 4000000, tolls: 350000 },
            { id: 37, province: "Hà Nội", arrival: "Nguyễn Xiển, Q. Hoàng Mai,Hà NộI", pricing: 4000000, tolls: 350000 },
            { id: 38, province: "Hà Nội", arrival: "Tây Hồ - Hà Nội", pricing: 4000000, tolls: 350000 },
            { id: 39, province: "Hà Nội", arrival: "Vĩnh Xuyên - Vĩnh Phú - Hà Nội", pricing: 4000000, tolls: 350000 },
            { id: 40, province: "Hà Nội", arrival: "Quốc Oai, Hà Nội", pricing: 4000000, tolls: 350000 },
            { id: 41, province: "Hà Nội", arrival: "Quang Minh - Hà Nội", pricing: 4000000, tolls: 350000 },
            { id: 42, province: "Hà Nội", arrival: "Đông Anh, Hà Nội", pricing: 4000000, tolls: 350000 },
            { id: 43, province: "Hà Nội", arrival: "KDT Văn Phú -Phú La - Hà Đông", pricing: 4000000, tolls: 350000 },
            { id: 44, province: "Hà Nội", arrival: "Gia Lâm - Hà Nội ", pricing: 4000000, tolls: 350000 },
            { id: 45, province: "Hà Nội", arrival: "Gia Lâm - Hà Nội ", pricing: 4000000, tolls: 350000 },
            { id: 46, province: "Hà Nội", arrival: "Thanh oai, HN", pricing: 4000000, tolls: 350000 },
            { id: 47, province: "Hà Nội", arrival: "Thạch Thất - Quốc Oai", pricing: 4100000, tolls: 350000 },
            { id: 48, province: "Hà Nội", arrival: "Tam Hiệp - Phúc Thọ - Hà Tây", pricing: 4100000, tolls: 350000 },
            { id: 49, province: "Hà Nội", arrival: "Phú Xuyên", pricing: 4100000, tolls: 350000 },
            { id: 50, province: "Hà Nội", arrival: "KCN Bắc Thăng Long  - Hà Nội", pricing: 4000000, tolls: 350000 },
            { id: 51, province: "Hà Nội", arrival: "Xuân Mai -Sóc Sơn, Hà Nội ", pricing: 4200000, tolls: 350000 },
            { id: 52, province: "Hà Nội", arrival: "Hà Đông -Hà Nội ", pricing: 4000000, tolls: 350000 },
            { id: 53, province: "Hà Nội", arrival: "Phùng-Đan phượng-Hà Nội ", pricing: 4100000, tolls: 350000 },

        ];
        await CostModel.bulkCreate(CostData, { updateOnDuplicate: ['id'] });
        console.log("Insert cost data success");
    }
}