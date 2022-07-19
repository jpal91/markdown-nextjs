import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import { connect } from "react-redux";

import {
  setFileName,
  setAlert,
  createNewDoc,
  renameFile,
  unsavedChanges,
  masterUpdateHandler
} from "../../actions";

const FileInfo = (props) => {
  const {
    fileName,
    setFileName,
    buttonStatus,
    createNewDoc,
    mdData,
    renameFile,
    unsavedChanges,
    masterUpdateHandler,
    saveState
  } = props;
  const elementRef = useRef();
  const router = useRouter();
  const [isInput, setIsInput] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = () => setIsInput(!isInput);

  useEffect(() => {
    setDisableButton(false);
    setInputValue("");

    return () => {
      setDisableButton(false);
      setInputValue("");
    };
  }, []);

  useEffect(() => {
    if (!isInput) {
      return;
    }

    setDisableButton(true);
    let ele = elementRef.current;

    ele.focus();

    const editInput = async (e) => {
      if (e.type === "focusout") {
        e.preventDefault();
        if (ele.value.length === 0) {
          setIsInput(false);
          setDisableButton(false);
          return;
        }

        if (buttonStatus.fileName === "new") {
          setLoading(true);
          //await createNewDoc({
          await masterUpdateHandler(saveState, "create", {
            fileName: ele.value,
            date: new Date().toLocaleDateString(),
            md: mdData
          })
            .then(() => {
              setFileName(ele.value);
              unsavedChanges(false);
              router.push(`/${saveState}/${ele.value}`, undefined, {
                shallow: true
              });
            })
            .catch(() => {
              setInputValue("");
            })
            .finally(() => {
              setIsInput(false);
              setDisableButton(false);
              setLoading(false);
            });
        } else if (buttonStatus.fileName === "rename") {
          setLoading(true);
          //await renameFile(fileName, ele.value)
          await masterUpdateHandler(saveState, "rename", {
            oldFN: fileName,
            newFN: ele.value
          })
            .then(() => {
              setFileName(ele.value);
              unsavedChanges(false);
              router.push(`/${saveState}/${ele.value}`);
            })
            .catch(() => setInputValue(""))
            .finally(() => {
              setIsInput(false);
              setDisableButton(false);
              setLoading(false);
            });
        }
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
          disabled={disableButton || buttonStatus.fileName === "disabled"}
        >
          <Typography hidden={isInput} variant="headingText">
            {`${fileName}.md`}
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
            endAdornment: (
              <CircularProgress
                size={14}
                sx={{
                  color: "primary.dOrange",
                  position: "absolute",
                  left: "90%",
                  visibility: loading ? "visible" : "hidden"
                }}
              />
            ),
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
    localData: state.localData,
    buttonStatus: state.buttonStatus,
    mdData: state.mdData,
    saveState: state.saveState
  };
};

export default connect(mapStateToProps, {
  setFileName,
  setAlert,
  createNewDoc,
  renameFile,
  unsavedChanges,
  masterUpdateHandler
})(FileInfo);
