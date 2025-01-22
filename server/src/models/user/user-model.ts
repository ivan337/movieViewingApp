import {
    BelongsToManyAddAssociationMixin,
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

import sqliteConnection from '../../dbService/sqlite-connection';

import Role from './role-model';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<string>; // Необязательное поле
    declare userName: string; // Обязательное поле
    declare createdAt: CreationOptional<Date>; // Необязательное поле
    declare updatedAt: CreationOptional<Date>; // Необязательное поле
    declare isActivated: CreationOptional<boolean>; // Необязательное поле

    declare addRole: BelongsToManyAddAssociationMixin<Role, string>;
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userName: {
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
