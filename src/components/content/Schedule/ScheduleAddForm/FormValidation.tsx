import * as Yup from "yup";

export const validationSchema = Yup.object({
  text: Yup.string().required("Обязательное поле"),
});
