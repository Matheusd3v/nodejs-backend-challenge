import { config } from "dotenv";

import app from "./app";
import { AppDataSource } from "./database/data-source";

config();

const PORT = Number(process.env.PORT);

app.listen(PORT, () => {
    console.log(`Running::${PORT}`);
    // console.log(AppDataSource.options, "<========");
    AppDataSource.initialize()
        .then(() => console.log("Connected"))
        .catch((err) => console.log("Don't connect!!", err));
});
