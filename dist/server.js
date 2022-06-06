"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const app_1 = __importDefault(require("./app"));
const data_source_1 = require("./database/data-source");
(0, dotenv_1.config)();
const PORT = Number(process.env.PORT);
app_1.default.listen(PORT, () => {
    console.log(`Running::${PORT}`);
    // console.log(AppDataSource.options, "<========");
    data_source_1.AppDataSource.initialize()
        .then(() => console.log("Connected"))
        .catch((err) => console.log("Don't connect!!", err));
});
//# sourceMappingURL=server.js.map