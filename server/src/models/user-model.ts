import { DataTypes, IncludeOptions, Model, Optional } from 'sequelize';

import sqliteConnection from '../dbService/sqlite-connection';

import { AuthData } from './index';

interface UserAttributes {
    id: string;
    username: string;
    createdAt: Date;
    updatedAt: Date;
    isActivated: boolean;
}

interface UserCreationAttributes
    extends Optional<
        UserAttributes,
        'id' | 'createdAt' | 'updatedAt' | 'isActivated'
    > {}

class User
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes
{
    public id!: string;
    public username!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
    public isActivated!: boolean;
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        isActivated: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        sequelize: sqliteConnection,
        modelName: 'User',
    },
);

export default User;
