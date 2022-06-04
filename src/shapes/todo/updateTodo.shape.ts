import * as yup from "yup";

import { MyDateLib } from "../../utils/myDateLib.util";

const updateTodoShape = yup.object().shape({
    description: yup.string().trim().lowercase(),
    deadline: yup
        .string()
        .trim()
        .matches(
            new MyDateLib().deadlinePattern,
            "deadline must have format 'dd/mm/yyyy 24:59:59' "
        ),
});

export { updateTodoShape };
