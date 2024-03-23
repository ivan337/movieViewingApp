class ApiError extends Error {
    status: number;
    constructor(status: number, message: string) {
        super(message);
        
        this.status = status
        //this.errors = errors
    }

    static internalError() {
        return new ApiError(500, 'Непредвиненная ошибка');
    }

    static unauthorizedError() {
        return new ApiError(401, 'Пользователь не авторизован')
    }

    static notFoundError() {
        return new ApiError(404, 'Страница не найдена')
    }

    static badRequest(message: string) {
        return new ApiError(400, message)
    }
}

export default ApiError