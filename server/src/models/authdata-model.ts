import { Model, DataTypes, Optional } from 'sequelize';

import sqliteConnection from '../dbService/sqlite-connection';

interface AuthDataAttributes {
    id: string;
    userId: string;
    email: string;
    passwordHash: string;
    lastLogin?: Date;
}

interface AuthDataCreationAttributes
    extends Optional<AuthDataAttributes, 'id' | 'lastLogin'> {}

class AuthData
    extends Model<AuthDataAttributes, AuthDataCreationAttributes>
    implements AuthDataAttributes
{
    public id!: string;
    public userId!: string;
    public email!: string;
    public passwordHash!: string;
    public lastLogin!: Date;
}

AuthData.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastLogin: {
            type: DataTypes.DATE,
        },
    },
    {
        sequelize: sqliteConnection,
        modelName: 'AuthData',
    },
);

export default AuthData;
