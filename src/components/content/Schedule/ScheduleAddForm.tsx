import styled from "@emotion/styled";
import { Box, Button, TextField } from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Field, Form, Formik } from "formik";
import { AppDispatch } from "../../../app/store";
import { useDispatch } from "react-redux";
import {
  addContent,
  setIsContentModalOpen,
} from "../../../features/ScheduleSlice";

const CustomTimePicker = styled(TimePicker)(() => ({
  ".MuiInputAdornment-root": {
    display: "none", // Скрываем иконку часика
  },
}));

export function ScheduleAddForm(props: { index: number }) {
  const initialValues = {
    startTime: dayjs(),
    endTime: dayjs().add(1, "hour"),
    text: "",
  };
  const dispatch: AppDispatch = useDispatch();
  const submit = (values: typeof initialValues) => {
    const formattedValues = {
      ...values,
      startTime: values.startTime.format("HH:mm"),
      endTime: values.endTime.format("HH:mm"),
    };
    dispatch(addContent({ index: props.index, values: formattedValues }));
    dispatch(setIsContentModalOpen(false));
  };
  return (
    <Formik initialValues={initialValues} onSubmit={(values) => submit(values)}>
      {({ setFieldValue, values, handleReset }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Form>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Field name="startTime">
                  {() => (
                    <CustomTimePicker
                      label="Начало"
                      value={values.startTime}
                      format="HH:mm"
                      onChange={(newValue) => {
                        setFieldValue("startTime", newValue);
                      }}
                    />
                  )}
                </Field>
                <Field name="endTime">
                  {() => (
                    <CustomTimePicker
                      label="Конец"
                      value={values.endTime}
                      format="HH:mm"
                      onChange={(newValue) =>
                        setFieldValue("endTime", newValue)
                      }
                    />
                  )}
                </Field>
              </Box>
              <Field name="text">
                {() => (
                  <TextField
                    id="outlined-basic"
                    label="Название"
                    variant="outlined"
                    value={values.text}
                    onChange={(e) => {
                      setFieldValue("text", e.target.value);
                    }}
                  />
                )}
              </Field>
              <Box sx={{ display: "flex", gap: 2, flexGrow: 1 }}>
                <Button
                  onClick={handleReset}
                  variant="outlined"
                  color="warning"
                  sx={{ flex: 1 }}
                >
                  Сбросить
                </Button>
                <Button
                  type="submit"
                  variant="outlined"
                  color="success"
                  sx={{ flex: 1 }}
                >
                  Принять
                </Button>
              </Box>
            </Box>
          </Form>
        </LocalizationProvider>
      )}
    </Formik>
  );
}
