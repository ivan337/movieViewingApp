declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production';
        PORT: string;
        CLIENT_URL: string;
        ROOT_PATH: string;
        // Добавьте другие переменные окружения, которые вы используете
    }
}