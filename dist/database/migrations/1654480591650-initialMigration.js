"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialMigration1654480591650 = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const uuid_1 = require("uuid");
dotenv_1.default.config();
class initialMigration1654480591650 {
    constructor() {
        this.name = "initialMigration1654480591650";
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`users_admin\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(250) NOT NULL, \`password\` text NOT NULL, \`admin_key\` text NOT NULL, UNIQUE INDEX \`IDX_23b4b9ed689230fb3af339412e\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(250) NOT NULL, \`password\` text NOT NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`todos\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`finished_at\` varchar(100) NULL, \`deadline\` datetime NOT NULL, \`description\` varchar(250) NOT NULL, \`overdue\` tinyint NOT NULL DEFAULT 0, \`userId\` varchar(36) NULL, UNIQUE INDEX \`IDX_1cee1ea8c2ffede4dd454af7eb\` (\`userId\`, \`description\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`todos\` ADD CONSTRAINT \`FK_4583be7753873b4ead956f040e3\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`INSERT INTO users_admin (id, email, password, admin_key) VALUES ('${(0, uuid_1.v4)()}', '${process.env.ADMIN_EMAIL || "admin@email.com"}', '${process.env.ADMIN_PASS
            ? bcrypt_1.default.hashSync(process.env.ADMIN_PASS, 10)
            : bcrypt_1.default.hashSync("admin123", 10)}', '${bcrypt_1.default.hashSync(process.env.ADMIN_KEY, 10)}'); `);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`todos\` DROP FOREIGN KEY \`FK_4583be7753873b4ead956f040e3\``);
        await queryRunner.query(`DROP INDEX \`IDX_1cee1ea8c2ffede4dd454af7eb\` ON \`todos\``);
        await queryRunner.query(`DROP TABLE \`todos\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_23b4b9ed689230fb3af339412e\` ON \`users_admin\``);
        await queryRunner.query(`DROP TABLE \`users_admin\``);
    }
}
exports.initialMigration1654480591650 = initialMigration1654480591650;
//# sourceMappingURL=1654480591650-initialMigration.js.map