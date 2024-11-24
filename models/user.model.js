const { DataTypes, Sequelize } = require('sequelize');

module.exports = {
    /**
     * @param {Sequelize} sequelize 
     * @returns 
     */
    defineUserModel: (sequelize) => {
        const CustomerModel = sequelize.define("USERS", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            birthday: {
                type: DataTypes.DATE,
                allowNull: true
            },
            position: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            address: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            phone_number: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            start_date: {
                type: DataTypes.DATE,
                allowNull: true
            },
            end_date: {
                type: DataTypes.DATE,
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
            account: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            password: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            is_deleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        }, {
            timestamps: true,
            tableName: "USERS"
        });
        return CustomerModel;
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
                position: null,
                address: null,
                phone_number: null,
                birthday: null,
                start_date: null,
                end_date: null,
                status: 1,
                is_admin: true,
                account: "admin",
                password: "123456"
            },
        ];
        await UserModel.bulkCreate(userData, { updateOnDuplicate: ['id'] });
        console.log("Insert user success");
    }
}