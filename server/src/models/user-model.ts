import { DataTypes, Model, Optional } from 'sequelize';

import sqliteConnection from '../dbService/sqlite-connection';

interface UserAttributes {
    id: number;
    email: string;
    password: string;
    isActivated: boolean;
    activationLink: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class UserModel
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes
{
    public id!: number;
    public email!: string;
    public password!: string;
    public isActivated!: boolean;
    public activationLink!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

UserModel.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isActivated: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        activationLink: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize: sqliteConnection,
        tableName: 'users',
        timestamps: true,
    },
);

export default UserModel;
