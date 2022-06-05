import * as yup from "yup";

const adminLoginShape = yup.object().shape({
    email: yup.string().trim().lowercase().strict().required(),
    password: yup.string().trim().strict().required(),
    adminKey: yup.string().trim().strict().required(),
});

export { adminLoginShape };
