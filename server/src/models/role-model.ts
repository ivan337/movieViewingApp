import { Model, DataTypes, Optional } from 'sequelize';

import sqliteConnection from '../dbService/sqlite-connection';

interface RoleAttributes {
    id: string;
    name: string;
}

interface RoleCreationAttributes extends Optional<RoleAttributes, 'id'> {}

class Role
    extends Model<RoleAttributes, RoleCreationAttributes>
    implements RoleAttributes
{
    public id!: string;
    public name!: string;
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
