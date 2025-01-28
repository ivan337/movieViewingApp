import Role from './role-model';
import Token from './token-model';
import User from './user-model';
import UserDetail from './userdetail-model';

const setupAssociations = () => {
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
    User.hasMany(Token, { foreignKey: 'userId', onDelete: 'CASCADE' });
    Token.belongsTo(User, { foreignKey: 'userId' });

    User.hasOne(UserDetail, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        as: 'UserDetail',
    });
    UserDetail.belongsTo(User, { foreignKey: 'UserDetailId', as: 'User' });
};

export { User, Role, Token, UserDetail, setupAssociations };
