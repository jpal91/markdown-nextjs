//import styles from '../styles/Home.module.css'
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import InputBase from "@mui/material/InputBase";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";

export default function Home() {
  //const vp = window.visualViewport

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
          sx={{
            width: "100%",
            overflow: "auto"
          }}
          minRows={30}
          InputProps={{ disableUnderline: "true" }}
        />
      </Grid>
      <Grid
        xs={6}
        sx={{
          width: "100%",
          height: "calc(100vh - 114px)",
          borderLeft: "1px solid",
          borderColor: "primary.vlgray",
          flex: "1 1 auto",
          p: 5
        }}
      >
        Thing2
      </Grid>
    </Container>
  );
}
// <TextField varint='outlined' fullWidth multiline sx={{ height: '100%' }} maxRows={50} InputProps={{ classes: { input: {height: 2000} } }}/>
