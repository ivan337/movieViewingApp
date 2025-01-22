import { IncludeOptions } from 'sequelize';

import AuthData from './authdata-model';
import Role from './role-model';
import Token from './token-model';
import User from './user-model';
import UserRole from './userrole-model';

// Связь User и AuthData (один к одному)
User.hasOne(AuthData, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    as: 'AuthData',
});
AuthData.belongsTo(User, { foreignKey: 'userId', as: 'User' });

// Связь User и Role (многие ко многим через UserRole)
User.belongsToMany(Role, {
    through: UserRole,
    foreignKey: 'userId',
    onDelete: 'CASCADE',
});
Role.belongsToMany(User, {
    through: UserRole,
    foreignKey: 'roleId',
    onDelete: 'CASCADE',
});

// Связь User и Token (один ко многим)
User.hasMany(Token, { foreignKey: 'userId', onDelete: 'CASCADE' });
Token.belongsTo(User, { foreignKey: 'userId' });

export type UserWithAuthData = User & {
    AuthData: AuthData;
};

export const findUserByEmail = async (
    email: string,
): Promise<UserWithAuthData | null> => {
    return this.findOne({
        where: { email },
        include: [
            {
                model: AuthData,
                as: 'AuthData', // Убедитесь, что `as` совпадает с именем ассоциации
                required: true, // Гарантирует, что у пользователя есть запись в AuthData
            },
        ],
    }) as Promise<UserWithAuthData | null>; // Приводим результат к кастомному типу
};

export const createUser = async ({
    userName,
    email,
    password,
    roleName,
}: {
    userName: string;
    email: string;
    password: string;
    roleName: string;
}) => {
    const user = await User.create({
        username: userName,
    });

    await AuthData.create({
        userId: user.id,
        email: email,
        passwordHash: password,
    });

    const role = await Role.create({
        name: roleName,
    });

    await UserRole.create({
        userId: user.id,
        roleId: role.id,
    });
};

export const findTokenByUserId = async (
    userId: string,
): Promise<Token | null> => {
    return this.findOne({
        where: { userId },
        include: [
            {
                model: Token,
                as: 'Token', // Убедитесь, что `as` совпадает с именем ассоциации
                required: true, // Гарантирует, что у пользователя есть запись в AuthData
            },
        ],
    }) as Promise<Token | null>; // Приводим результат к кастомному типу
};

export const createToken = async ({
    userId,
    token,
}: {
    userId: string;
    token: string;
}): Promise<void> => {};

export { User, AuthData, Role, UserRole, Token };
