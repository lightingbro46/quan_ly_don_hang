const { DataTypes, Sequelize } = require('sequelize');

module.exports = {
    /**
     * @param {Sequelize} sequelize 
     * @returns 
     */
    defineCustomerModel: (sequelize) => {
        const CustomerModel = sequelize.define("CUSTOMERS", {
            CUSTOMER_ID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            CUSTOMER_NAME: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            CUSTOMER_COMPANY: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            CUSTOMER_TAX: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            CUSTOMER_ADDRESS: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            CUSTOMER_PHONE: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            CUSTOMER_EMAIL: {
                type: DataTypes.TEXT,
                allowNull: true
            },
        }, {
            timestamps: true,
            tableName: "CUSTOMERS"
        });
        return CustomerModel;
    }
}