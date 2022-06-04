import dotenv from "dotenv";

dotenv.config();

interface IJWTConfig {
    secretKey: string;
    expiresIn: string | number;
}

const jwtConfig: IJWTConfig = {
    secretKey: process.env.SECRET_KEY,
    expiresIn: process.env.EXPIRES_IN,
};

export { jwtConfig };
