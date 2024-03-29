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
    unsavedChanges,
    masterUpdateHandler,
} from "../../actions";

//Sub-component of NavBar/index - holds the Document Name section with renaming functionality
const FileInfo = (props) => {
    const {
        fileName,
        setFileName,
        buttonStatus,
        mdData,
        unsavedChanges,
        masterUpdateHandler,
        saveState,
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

    //The document name (in the navbar) in it's normal state is a button, once pressed it turns into an input.
    //A ref tracks the input value and on click away, the value is submitted as the new file name
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
                
                //If the user input nothing, no action is taken
                if (ele.value.length === 0) {
                    setIsInput(false);
                    setDisableButton(false);
                    return;
                }

                //Handles two instances - if the user is on the home screen, the renaming
                //function acts as if the user is creating a new document instead of renaming.
                //If the user is in a file they own, it will initite the function to rename an existing file.
                //buttonStatus is assigned based on the page, which changes how it reacts.
                if (buttonStatus.fileName === "new") {
                    setLoading(true);
                    await masterUpdateHandler(saveState, "create", {
                        fileName: ele.value,
                        date: new Date().toLocaleDateString(),
                        md: mdData,
                    })
                        .then(() => {
                            setFileName(ele.value);
                            unsavedChanges(false);
                            router.push(
                                `/${saveState}/${ele.value}`,
                                undefined,
                                {
                                    shallow: true,
                                }
                            );
                        })
                        .catch(() => {
                            setInputValue("");
                        })
                        .finally(() => {
                            setIsInput(false);
                            setDisableButton(false);
                            setLoading(false);
                            setInputValue("");
                        });
                } else if (buttonStatus.fileName === "rename") {
                    setLoading(true);
                    await masterUpdateHandler(saveState, "rename", {
                        oldFN: fileName,
                        newFN: ele.value,
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
                            setInputValue("");
                        });
                }
            }
        };

        ele.addEventListener("focusout", editInput, { once: true });
    }, [isInput]);

    return (
        <Grid container sx={{ width: "200px", ml: 1, display: { xs: 'none', sm: 'flex' } }}>
            <Grid item xs={3} sx={{ alignItems: "center" }}>
                <InsertDriveFileOutlinedIcon
                    alt="Document Icon"
                    title="Document Icon"
                />
            </Grid>
            <Grid item xs={9} sx={{ flexDirection: "column" }}>
                <Typography
                    variant="headingText"
                    sx={{ color: "primary.vlgray" }}
                >
                    Document Name
                </Typography>
                <ButtonBase
                    onClick={handleClick}
                    sx={{ justifyContent: "flex-start" }}
                    disabled={
                        disableButton || buttonStatus.fileName === "disabled"
                    }
                    aria-label="Rename your file"
                    title="Rename your file"
                >
                    <Typography hidden={isInput} variant="headingText" sx={{ '&:hover': { color: 'primary.lOrange' } }}>
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
                                    visibility: loading ? "visible" : "hidden",
                                }}
                            />
                        ),
                        sx: {
                            typography: "editor",
                            lineHeight: "24px",
                            tabSize: 1,
                            color: "white",
                            borderBottom: "1px solid white",
                        },
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
        saveState: state.saveState,
    };
};

export default connect(mapStateToProps, {
    setFileName,
    setAlert,
    unsavedChanges,
    masterUpdateHandler,
})(FileInfo);
