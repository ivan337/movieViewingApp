import {
    Model,
    DataTypes,
    InferCreationAttributes,
    InferAttributes,
    CreationOptional,
} from 'sequelize';

import sqliteConnection from '../../dbService/sqlite-connection';

class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
    declare id: CreationOptional<string>;
    declare name: CreationOptional<string>;
}

Role.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize: sqliteConnection,
        modelName: 'Role',
    },
);

export default Role;
