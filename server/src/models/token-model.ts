import {DataTypes, Sequelize} from "sequelize";
import sqliteConnection from "../dbService/sqlite-connection";

//ConnectDb.sequelize.createSchema('TokenSchema', {})
export const TokenModel = sqliteConnection.define('TokenModel', {
    user: {
        type: DataTypes.UUID
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false
    }
});