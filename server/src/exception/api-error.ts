class ApiError extends Error {
    status: number;
    constructor(status: number, message: string) {
        super(message);

        this.status = status;
        //this.errors = errors
    }

    static internalError() {
        return new ApiError(500, 'Непредвиненная ошибка');
    }

    static unauthorizedError() {
        return new ApiError(401, 'Пользователь не авторизован');
    }

    static notFoundError() {
        return new ApiError(404, 'Страница не найдена');
    }

    static badRequest(message: string) {
        return new ApiError(400, message);
    }

    static clientClosedRequest() {
        return new ApiError(499, 'Client Closed Request');
    }

    static abortError() {
        return new ApiError(500, 'Request was aborted');
    }

    static timedOut() {
        return new ApiError(408, 'Connection  timed out');
    }
}

export default ApiError;
