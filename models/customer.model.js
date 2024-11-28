const { DataTypes, Sequelize } = require('sequelize');

module.exports = {
    /**
     * @param {Sequelize} sequelize 
     * @returns 
     */
    defineCustomerModel: (sequelize) => {
        const CustomerModel = sequelize.define("CUSTOMERS", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            company: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            tax: {
                type: DataTypes.INTEGER,
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
            email: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            is_deleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        }, {
            timestamps: true,
            tableName: "CUSTOMERS"
        });

        CustomerModel.associations = ({OrderModel}) => {
            CustomerModel.hasMany(OrderModel, { foreignKey: "customer_id" });
        }

        return CustomerModel;
    }
}