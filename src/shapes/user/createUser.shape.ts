import bcrypt from "bcrypt";
import * as yup from "yup";

const createUserShape = yup.object().shape({
    email: yup.string().trim().lowercase().required(),
    password: yup
        .string()
        .transform((pwd) => bcrypt.hashSync(pwd, 10))
        .required(),
});

export { createUserShape };
