import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";

const Calender = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          value={selectedDate}
          views={["year"]}
          onChange={(date) => setSelectedDate(date)}
          disableFuture
          sx={{ width: "100%", marginTop: "0px" }}
          format="YYYY"
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default Calender;
