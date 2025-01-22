interface IUserDto {
    email: string;
    id: string;
    isActivated: boolean;
}

class UserDto implements IUserDto {
    readonly email: string;
    readonly id: string;
    readonly isActivated: boolean;

    constructor(model: IUserDto) {
        this.email = model.email;
        this.id = model.id;
        this.isActivated = model.isActivated;
    }
}

export default UserDto;
