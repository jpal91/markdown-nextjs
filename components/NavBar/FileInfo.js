import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import TextField from "@mui/material/TextField";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import { connect } from "react-redux";

import { setFileName, setAlert } from "../../actions";

const FileInfo = (props) => {
  const { fileName, setFileName, localData, setAlert } = props;
  const elementRef = useRef();
  const router = useRouter();
  const [isInput, setIsInput] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleClick = () => setIsInput(!isInput);

  const fileExists = (str) => {
    let fileNameRegex = /\.md/;

    fileNameRegex.test(str) && (str = str.slice(0, -3));

    if (localData.docs[`${str}`]) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (router.query.id) {
      setDisableButton(true);
    }

    return () => {
      setDisableButton(false);
      setInputValue("");
    };
  }, [router]);

  useEffect(() => {
    if (!isInput) {
      return;
    }

    setDisableButton(true);
    let ele = elementRef.current;

    ele.focus();

    const editInput = (e) => {
      let fileNameRegex = /\.md/;

      if (e.type === "focusout") {
        e.preventDefault();
        if (ele.value.length === 0) {
          setIsInput(false);
          setDisableButton(false);
          return;
        }

        const checkFileExists = fileExists(ele.value);

        if (checkFileExists) {
          setIsInput(false);
          setDisableButton(false);
          setAlert({
            open: true,
            message: "File Already Exists!",
            severity: "error"
          });
          return;
        }

        fileNameRegex.test(ele.value)
          ? setFileName(ele.value)
          : setFileName(ele.value + ".md");
        setIsInput(false);
        setDisableButton(false);
      }
    };

    ele.addEventListener("focusout", editInput, { once: true });
  }, [isInput]);

  return (
    <Grid container sx={{ width: "200px", ml: 1 }}>
      <Grid item xs={3} sx={{ alignItems: "center" }}>
        <InsertDriveFileOutlinedIcon />
      </Grid>
      <Grid item xs={9} sx={{ flexDirection: "column" }}>
        <Typography variant="headingText" sx={{ color: "primary.vlgray" }}>
          Document Name
        </Typography>
        <ButtonBase
          onClick={handleClick}
          sx={{ justifyContent: "flex-start" }}
          disabled={disableButton}
        >
          <Typography hidden={isInput} variant="headingText">
            {fileName}
          </Typography>
        </ButtonBase>
        <TextField
          sx={{ display: !isInput ? "none" : "block" }}
          variant="standard"
          inputRef={elementRef}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          InputProps={{
            disableUnderline: false,
            sx: {
              typography: "editor",
              lineHeight: "24px",
              tabSize: 1,
              color: "white",
              borderBottom: "1px solid white"
            }
          }}
        />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    fileName: state.fileName,
    localData: state.localData
  };
};

export default connect(mapStateToProps, { setFileName, setAlert })(FileInfo);
