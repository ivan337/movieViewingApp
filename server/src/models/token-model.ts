import { DataTypes, Model, Optional } from 'sequelize';
import sqliteConnection from '../dbService/sqlite-connection';

interface TokenAttributes {
    id: number;
    user: number;
    refreshToken: string;
}

interface TokenCreationAttributes extends Optional<TokenAttributes, 'id'> {}

class TokenModel extends Model<TokenAttributes, TokenCreationAttributes> implements TokenAttributes {
    public id!: number;
    public user!: number;
    public refreshToken!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

TokenModel.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        user: {
            type: DataTypes.UUID,
        },
        refreshToken: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: sqliteConnection,
        tableName: 'tokens',
        timestamps: true,
    }
);

export default TokenModel;