import * as yup from "yup";

const createUserShape = yup.object().shape({
    email: yup.string().trim().lowercase().required(),
    password: yup.string().trim().strict().required(),
});

export { createUserShape };
