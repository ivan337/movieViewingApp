import { DataTypes, Model, Optional } from 'sequelize';
import sqliteConnection from '../dbService/sqlite-connection';

interface IdempotencyAttributes {
    idempotencyKey: string;
}

interface IdempotencyCreationAttributes extends Optional<IdempotencyAttributes, 'idempotencyKey'> {}

class IdempotencyModel extends Model<IdempotencyAttributes, IdempotencyCreationAttributes> implements IdempotencyAttributes {
    public idempotencyKey!: string;
}

IdempotencyModel.init(
    {
        idempotencyKey: {
            type: DataTypes.STRING,
            primaryKey: true,
        }
    },
    {
        sequelize: sqliteConnection,
        tableName: 'idempotency',
        timestamps: true
    }
);

export default IdempotencyModel;