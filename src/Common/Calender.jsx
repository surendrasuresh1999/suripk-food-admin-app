import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const newTheme = (theme) => createTheme({
  ...theme,
  components: {
    MuiPickersToolbar: {
      styleOverrides: {
        root: {
          color: '#1565c0',
          borderRadius: '2px',
          borderWidth: '1px',
          borderColor: '#2196f3',
          border: '1px solid',
          backgroundColor: '#90caf9',
        }
      }
    }
  }
})

const Calender = ({ viewsArr, disablePast, disableFuture, format }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  return (
    <ThemeProvider theme={newTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            value={selectedDate}
            views={viewsArr}
            onChange={(date) => setSelectedDate(date)}
            disableFuture={disableFuture}
            disablePast={disablePast}
            sx={{ width: "100%", marginTop: "0px" }}
            format={format}
            // slotProps={{
            //   popup: {
            //     className: "custom-datepicker-popup",
            //   },
            // }}
          />
        </DemoContainer>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default Calender;
