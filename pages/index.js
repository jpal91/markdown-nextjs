//import styles from '../styles/Home.module.css'
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import ReactHtmlParser from "react-html-parser";

const transform = (node, index) => {
  if (node.name && node.name.startsWith("h")) {
    let tagName = node.name;
    let str = "";
    node.children.forEach((child) => (str += child.data));

    return (
      <Typography key={index} variant={tagName}>
        {str}
      </Typography>
    );
  }
};

export default function Home() {
  //const vp = window.visualViewport
  const [data, setData] = useState("");
  const handleChange = (event) => setData(event.target.value);

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
            overflow: "auto"
          }}
          minRows={30}
          InputProps={{
            disableUnderline: true,
            sx: { typography: "editor", lineHeight: "24px" }
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
          typography: "body2",
          justifyContent: "flex-start"
        }}
      >
        {ReactHtmlParser(data, { transform: transform })}
      </Grid>
    </Container>
  );
}
// <TextField varint='outlined' fullWidth multiline sx={{ height: '100%' }} maxRows={50} InputProps={{ classes: { input: {height: 2000} } }}/>
//
