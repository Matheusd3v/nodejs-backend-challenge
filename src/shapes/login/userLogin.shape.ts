import * as yup from "yup";

const userLoginShape = yup.object().shape({
    email: yup.string().trim().lowercase().strict().required(),
    password: yup.string().trim().strict().required(),
});

export { userLoginShape };
