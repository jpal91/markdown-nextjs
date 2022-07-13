import { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import TextField from "@mui/material/TextField";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import { connect } from "react-redux";

import { setFileName } from "../../actions";

const FileInfo = (props) => {
    const { fileName, setFileName } = props
    const elementRef = useRef();
    const [isInput, setIsInput] = useState(false);
    const [inputValue, setInputValue] = useState('')
    // const [fileName, setFileName] = useState("welcome.md");

    const handleClick = () => setIsInput(!isInput);
    

    useEffect(() => {
        if (!isInput) {
            
            return;
        }
        let ele = elementRef.current;

        ele.focus()

        const editInput = (e) => {
            let fileNameRegex = /\.md/

            if (e.type === "focusout") {
                e.preventDefault();
                if (ele.value.length === 0) { return setIsInput(false) }
                fileNameRegex.test(ele.value) ? setFileName(ele.value) : setFileName(ele.value + '.md')
                setIsInput(false);
            }
        }

        ele.addEventListener("focusout", editInput, { once: true })

    }, [isInput]);

    return (
        <Grid container sx={{ width: "200px", ml: 1 }}>
            <Grid item xs={3} sx={{ alignItems: "center" }}>
                <InsertDriveFileOutlinedIcon />
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
                    disabled={isInput}
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
                            color: 'white'
                        },
                    }}
                />
            </Grid>
        </Grid>
    );
};

const mapStateToProps = (state) => {
    return {
        fileName: state.fileName
    }
}

export default connect(mapStateToProps, { setFileName })(FileInfo);
