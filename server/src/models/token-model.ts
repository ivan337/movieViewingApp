import { Model, DataTypes, Optional } from 'sequelize';

import sqliteConnection from '../dbService/sqlite-connection';

interface TokenAttributes {
    id: string;
    userId: string;
    token: string;
    expiresAt: Date;
    isRevoked: boolean;
}

interface TokenCreationAttributes
    extends Optional<TokenAttributes, 'id' | 'isRevoked'> {}

class Token
    extends Model<TokenAttributes, TokenCreationAttributes>
    implements TokenAttributes
{
    public id!: string;
    public userId!: string;
    public token!: string;
    public expiresAt!: Date;
    public isRevoked!: boolean;
}

Token.init(
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
        token: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        isRevoked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize: sqliteConnection,
        modelName: 'Token',
    },
);

export default Token;
