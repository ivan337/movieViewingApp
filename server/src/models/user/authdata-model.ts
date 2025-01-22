import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from 'sequelize';

import sqliteConnection from '../../dbService/sqlite-connection';

class AuthData extends Model<
    InferAttributes<AuthData>,
    InferCreationAttributes<AuthData>
> {
    declare id: CreationOptional<string>;
    declare userId: CreationOptional<string>;
    declare email: string;
    declare passwordHash: string;
    declare lastLogin: CreationOptional<Date>;
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
