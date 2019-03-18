"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var connectionOptions = {
    type: "mariadb",
    database: "moodselah",
    synchronize: true,
    logging: false,
    entities: ["entities/**/*.*"],
    host: process.env.DB_ENDPOINT,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
};
exports.default = connectionOptions;
//# sourceMappingURL=ormConfig.js.map