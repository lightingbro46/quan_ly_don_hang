const { DataTypes, Sequelize } = require('sequelize');

module.exports = {
    /**
     * @param {Sequelize} sequelize 
     * @returns 
     */
    defineUserModel: (sequelize) => {
        const UserModel = sequelize.define("USERS", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            password: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            fullname: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            gender: {
                type: DataTypes.TINYINT,
                allowNull: false
            },
            birthday: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            position: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            address: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            phone_number: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            start_date: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            end_date: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            status: {
                type: DataTypes.TINYINT,
                defaultValue: 1
                /**
                 * 1: Đang làm việc
                 * 2: Nghỉ việc
                 */
            },
            is_admin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
            is_deleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            identification: {
                type: DataTypes.TEXT,
                allowNull: false
            }
        }, {
            timestamps: true,
            tableName: "USERS"
        });

        UserModel.associations = ({ OrderModel }) => {
            UserModel.hasMany(OrderModel, { foreignKey: "user_id" });
        }

        return UserModel;
    },
    /**
     * @param {Model} UserModel 
     * @returns
     */
    insertUserData: async (UserModel) => {
        const userData = [
            {
                id: 1,
                username: "admin",
                password: "123456",
                fullname: "Nguyễn Văn A",
                position: "Quản trị",
                address: "Hà Nội",
                phone_number: "0928288228",
                gender: 1,
                birthday: new Date("1997-1-11"),
                start_date: new Date("2023-10-20"),
                end_date: null,
                status: 1,
                is_admin: true,
                identification: "11111111111111"
            },
            {
                id: 2,
                username: "user",
                password: "123456",
                fullname: "Nguyễn Thị B",
                position: "Nhân viên",
                gender: 2,
                address: "Hải Phòng",
                phone_number: "0928227277",
                birthday: new Date("1997-02-15"),
                start_date: new Date("2024-10-20"),
                end_date: null,
                status: 1,
                is_admin: false,
                identification: "22222222222222"
            },
        ];
        await UserModel.bulkCreate(userData, { updateOnDuplicate: ['id'] });
        console.log("Insert user success");
    }
}