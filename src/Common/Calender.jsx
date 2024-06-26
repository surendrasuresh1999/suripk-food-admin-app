import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useContext, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Context from "../Context/Context";
import dayjs from "dayjs";

const Calender = ({
  viewsArr,
  disablePast,
  disableFuture,
  format,
  hanlder,
  setterFun,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const { defaultMode } = useContext(Context);
  const darkTheme = createTheme({
    palette: {
      mode: defaultMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            value={selectedDate}
            views={viewsArr}
            onChange={(date) => {
              setSelectedDate(date);
              hanlder(dayjs(date).format("DD/MM/YYYY"));
            }}
            slotProps={{
              field: {
                clearable: true,
                onClear: () => {
                  setSelectedDate(null);
                  setterFun(null);
                },
              },
            }}
            disableFuture={disableFuture}
            disablePast={disablePast}
            sx={{ width: "100%", marginTop: "0px" }}
            format={format}
          />
        </DemoContainer>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default Calender;
