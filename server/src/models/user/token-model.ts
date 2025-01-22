import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from 'sequelize';

import sqliteConnection from '../../dbService/sqlite-connection';

class Token extends Model<
    InferAttributes<Token>,
    InferCreationAttributes<Token>
> {
    declare id: CreationOptional<string>;
    declare userId: string;
    declare token: string;
    declare expiresAt: Date;
    declare isRevoked: CreationOptional<boolean>;
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
