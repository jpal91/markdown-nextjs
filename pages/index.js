import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

import Data from "../components/Data";

export default function Home() {
  const [data, setData] = useState("");
  const handleChange = (event) => setData(event.target.value);

  useEffect(() => {
    const textId = document.querySelector("textarea");

    textId.addEventListener("keydown", (e) => {
      if (e.code === "Tab") {
        e.preventDefault();
        textId.setRangeText(
          "\t",
          textId.selectionStart,
          textId.selectionStart,
          "end"
        );
        handleChange(e);
      }
    });
  }, []);

  return (
    <Container
      sx={{
        maxWidth: "100% !important",
        height: "100%",
        maxHeight: "937px",
        justifyContent: "space-evenly",
        p: "0px !important"
      }}
    >
      <Grid
        item
        xs={6}
        sx={{
          width: "100%",
          height: "calc(100vh - 114px)",
          p: 5,
          borderRight: "1px solid",
          borderColor: "primary.vlgray"
        }}
      >
        <TextField
          multiline
          variant="standard"
          onChange={(event) => handleChange(event)}
          sx={{
            width: "100%",
            overflow: "auto",
            tabSize: 1
          }}
          minRows={30}
          InputProps={{
            disableUnderline: true,
            sx: { typography: "editor", lineHeight: "24px", tabSize: 1 }
          }}
        />
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          width: "100%",
          height: "calc(100vh - 114px)",
          borderLeft: "1px solid",
          borderColor: "primary.vlgray",
          flex: "1 1 auto",
          p: 5,
          typography: "body1",
          justifyContent: "flex-start"
        }}
      >
        <Data data={data} />
      </Grid>
    </Container>
  );
}
