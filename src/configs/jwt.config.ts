import { config } from "dotenv";

config();

interface IJWTCongif {
    secretKey: string;
    expiresIn: string | number;
}

const jwtConfig: IJWTCongif = {
    secretKey: process.env.SECRET_KEY,
    expiresIn: process.env.EXPIRES_IN,
};

export { jwtConfig };
