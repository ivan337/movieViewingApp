import AuthData from './authdata-model';
import Role from './role-model';
import Token from './token-model';
import User from './user-model';

const setupAssociations = () => {
    // Связь User и AuthData (один к одному)
    User.hasOne(AuthData, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        as: 'AuthData',
    });
    AuthData.belongsTo(User, { foreignKey: 'userId', as: 'User' });

    // Связь User и Role (многие ко многим через UserRole)
    User.belongsToMany(Role, {
        through: 'UserRole',
        foreignKey: 'userId',
        onDelete: 'CASCADE',
    });
    Role.belongsToMany(User, {
        through: 'UserRole',
        foreignKey: 'roleId',
        onDelete: 'CASCADE',
    });

    // Связь User и Token (один ко многим)
    User.hasMany(Token, { foreignKey: 'userId', onDelete: 'CASCADE' });
    Token.belongsTo(User, { foreignKey: 'userId' });
};

export { User, AuthData, Role, Token, setupAssociations };
