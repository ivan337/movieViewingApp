import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

import sqliteConnection from '../../dbService/sqlite-connection';

class UserDetail extends Model<
    InferAttributes<UserDetail>,
    InferCreationAttributes<UserDetail>
> {
    declare id: CreationOptional<string>;
    declare userId: string;
    declare firstName: string;
    declare lastName: string;
    declare bio: CreationOptional<string>;
    declare avatarUrl: CreationOptional<string>;
}

UserDetail.init(
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
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bio: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        avatarUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize: sqliteConnection,
        modelName: 'UserDetail',
    },
);

export default UserDetail;
