import * as yup from "yup";

import { titleCaseFunction } from "../../utils";
import { MyDateLib } from "../../utils/myDateLib.util";

const createTodoShape = yup.object().shape({
    description: yup
        .string()
        .transform(
            async (sentence: string) => await titleCaseFunction(sentence)
        ),
    deadline: yup
        .string()
        .trim()
        .matches(
            new MyDateLib().deadlinePattern,
            "deadline must have format 'dd/mm/yyyy 24:59:59' "
        )
        .transform(
            async (date: string) =>
                await new MyDateLib().convertToDateTime(date)
        ),
});

export { createTodoShape };
