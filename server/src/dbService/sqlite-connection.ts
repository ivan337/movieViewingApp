import { Sequelize } from 'sequelize';

const sqliteConnection = new Sequelize({
    logging: console.log,
    dialect: 'sqlite',
    host: '../db.sqlite',
    username: 'admin',
    password: '12345',
});
sqliteConnection
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

export default sqliteConnection;
