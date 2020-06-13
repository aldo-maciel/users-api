export const properties = {
    server: {
        port: process.env.PORT || 3001
    },
    log: {
        level: process.env.LOG_LEVEL || 'INFO',
        daysToKeep: process.env.LOG_DAYS || 15,
        path: process.env.LOG_PATH || 'logs/'
    },
    externalApis: {
        users: process.env.USERS_URL || 'https://api.github.com/users'
    }
};
