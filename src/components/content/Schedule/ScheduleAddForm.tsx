import styled from "@emotion/styled";
import { Box, Button, TextField } from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { Field, Form, Formik } from "formik";
import { AppDispatch, RootState } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import {
  addContent,
  setIsContentAddModalOpen,
} from "../../../features/ScheduleSlice";
import { useEffect, useState } from "react";
import { TargetType } from "./ScheduleComponent";

const CustomTimePicker = styled(TimePicker)(() => ({
  ".MuiInputAdornment-root": {
    display: "none", // Скрываем иконку часика
  },
}));

type initialValuesType = {
  text: string;
  startTime: Dayjs;
  endTime: Dayjs;
};

interface Props {
  target: TargetType | null;
}

export function ScheduleAddForm({ target }: Props) {
  const [initialValues, setInitialValues] = useState<initialValuesType>({
    startTime: dayjs(),
    endTime: dayjs().add(1, "hour"),
    text: "",
  });
  const data = useSelector((state: RootState) => {
    const dayIndex = state.schedule.week.findIndex(
      (item) => item.day === target?.day
    );
    const contentIndex = state.schedule.week[dayIndex].content.findIndex(
      (item) => item.id === target?.contentId
    );
    const data = state.schedule.week[dayIndex].content[contentIndex];
    return data;
  });
  useEffect(() => {
    if (data !== undefined) {
      setInitialValues({
        startTime: dayjs(data?.startTime, "HH:mm"),
        endTime: dayjs(data?.endTime, "HH:mm"),
        text: "",
      });
    }
  }, [data]);

  const dispatch: AppDispatch = useDispatch();
  const submit = (values: typeof initialValues) => {
    const formattedValues = {
      ...values,
      startTime: values.startTime.format("HH:mm"),
      endTime: values.endTime.format("HH:mm"),
    };
    dispatch(
      addContent({
        day: target?.day,
        values: formattedValues,
        contentId: target?.contentId,
      })
    );
    dispatch(setIsContentAddModalOpen(false));
  };
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={(values) => submit(values)}
    >
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
