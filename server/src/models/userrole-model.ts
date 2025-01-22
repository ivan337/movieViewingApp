import { Model, DataTypes } from 'sequelize';

import sqliteConnection from '../dbService/sqlite-connection';

interface UserRoleAttributes {
    userId: string;
    roleId: string;
}

class UserRole extends Model<UserRoleAttributes> implements UserRoleAttributes {
    public userId!: string;
    public roleId!: string;
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
