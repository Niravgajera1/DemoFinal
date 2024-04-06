import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function BasicDatePicker() {
  const currentDate = new Date().toISOString().split("T")[0];
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          format="DD-MM-YYYY"
          label="Select End Date"
          minDate={dayjs(currentDate)}
          defaultValue={dayjs(currentDate)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
