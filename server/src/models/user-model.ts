import {DataTypes, Model, Sequelize, InferAttributes, InferCreationAttributes} from "sequelize";
import sqliteConnection from "../dbService/sqlite-connection";

class UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
    declare email: string;
    declare password: string;
    declare isActivated: boolean;
    declare activationLink: string;

}

UserModel.init(
    {
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isActivated: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        activationLink: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize: sqliteConnection,
        tableName: 'users'
    }
);

export default UserModel;