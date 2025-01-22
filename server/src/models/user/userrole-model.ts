import { Model, DataTypes, InferAttributes, CreationOptional } from 'sequelize';

import sqliteConnection from '../../dbService/sqlite-connection';

class UserRole extends Model<InferAttributes<UserRole>> {
    declare userId: CreationOptional<string>;
    declare roleId: CreationOptional<string>;
}

UserRole.init(
    {
        userId: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
        roleId: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
    },
    {
        sequelize: sqliteConnection,
        modelName: 'UserRole',
    },
);

export default UserRole;
