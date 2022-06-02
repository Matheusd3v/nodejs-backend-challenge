import { config } from "dotenv";

import app from "./app";

config();

const PORT = Number(process.env.PORT);

app.listen(PORT, () => console.log(`Running::${PORT}`));
