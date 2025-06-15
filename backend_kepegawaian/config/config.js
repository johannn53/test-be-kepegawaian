require('dotenv').config();

const isDocker = process.env.RUNNING_IN_DOCKER === 'true';

module.exports = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || '1234a',
    database: process.env.DB_NAME || 'kepegawaian_development',
    host: isDocker ? 'host.docker.internal' : '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || '1234a',
    database: process.env.DB_NAME || 'kepegawaian_test',
    host: isDocker ? 'host.docker.internal' : '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || '1234a',
    database: process.env.DB_NAME || 'kepegawaian_production',
    host: isDocker ? 'host.docker.internal' : '127.0.0.1',
    dialect: 'postgres',
  },
};
