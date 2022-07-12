import { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

import Data from "../components/Data";
import { setData } from "../actions";
import ContentEditable from "react-contenteditable";




const Home = (props) => {
    const { isMenuOpen, isPreviewMode, setData, mdData } = props;

    const text = useRef('')

    const handleChange = (evt) => {
        text.current = evt.target.value
        setData(text.current)
    }

    useEffect(() => {
        const getData = async () => {
            await fetch('./examples/test.md')
            .then(res => res.text())
            .then(res => { 
                res = res.split(/\n/).map((el) => el.trim() && `<div>${el}</div><br>`).join('')
                // res = res.replace(/\n/g, '<br>')
                text.current = res
                setData(res)
            })
        }

        getData()
        
        // const textId = document.querySelector("textarea");
        const textId = document.getElementById('content')
        // document.getElementById('first').focus()

        // textId.addEventListener("keydown", (e) => {
        //     if (e.code === "Tab") {
        //         e.preventDefault();
        //         textId.setRangeText(
        //             "\t",
        //             textId.selectionStart,
        //             textId.selectionStart,
        //             "end"
        //         );
        //         setData(e.target.value);
        //     }
        // });

        // document.addEventListener('keydown', (e) => {
        //     console.log(e)
        //     if (e.code === 'Enter') {
        //         e.preventDefault()
        //         // let ele = document.createElement('div')
        //         // let br = document.createElement('br')
        //         // ele.setAttribute('id', 'new-content')
        //         // textId.appendChild(br)
        //         // textId.appendChild(ele)
        //         // console.log(document.getElementById('new-content'))
        //         document.execCommand('insertParagraph', false, '')
        //         textId.lastElementChild.focus()
        //     }
        // const divs = document.querySelectorAll('.un-edited>div')

        // divs.forEach((l) => console.log(l.setAttribute('class', 'pending')))
        }, [])
    // }, []);

    // const handleInput = (e) => {
    //     console.log(e)
    //     e.preventDefault()
    //     setData(e.target.innerHTML)
    // }

    useEffect(() => {
        const divs = document.querySelectorAll('.un-edited>div')
        // const list = divs.childNodes
        divs.forEach((l) => !l.hasAttributes() && l.setAttribute('class', 'pending'))
    }, [mdData])

    

    return (
        <Container
            sx={{
                maxWidth: "100% !important",
                height: "100%",
                maxHeight: "937px",
                justifyContent: "space-evenly",
                p: "0px !important",
                width: isMenuOpen ? "calc(100% - 240px)" : "100%",
                ml: isMenuOpen ? "240px" : 0,
            }}
        >
            <Grid
                item
                xs={6}
                sx={{
                    width: isPreviewMode ? '0%' : "100%",
                    height: "calc(100vh - 114px)",
                    p: isPreviewMode ? 0 : 5,
                    borderRight: isPreviewMode ? 'none' : "1px solid",
                    borderColor: "primary.vlgray",
                }}
            >
                {/* <TextField
                    multiline
                    variant="standard"
                    value={mdData}
                    onChange={(event) => setData(event.target.value)}
                    sx={{
                        width: "100%",
                        overflow: "auto",
                        tabSize: 1,
                    }}
                    minRows={30}
                    InputProps={{
                        disableUnderline: true,
                        sx: {
                            typography: "editor",
                            lineHeight: "24px",
                            tabSize: 1,
                        },
                    }}
                /> */}
                {/* <div contentEditable='true' style={{ width:'100%' }} onInput={(e) => handleInput(e)} id='content'><div id='first'></div></div> */}
                <ContentEditable 
                    html={text.current}
                    onChange={handleChange}
                    style={{ width: '100%', maxWidth: '100%', padding: '2px', overflow: 'auto', overflowWrap: 'break-word' }}
                    disabled={false}
                    className='un-edited'
                />
            </Grid>
            <Grid
                item
                xs={6}
                sx={{
                    width: "100%",
                    height: "calc(100vh - 114px)",
                    borderLeft: isPreviewMode ? 'none' : "1px solid",
                    borderColor: "primary.vlgray",
                    flex: "1 1 auto",
                    p: 5,
                    // px: 'auto',
                    typography: "body1",
                    justifyContent: isPreviewMode ? 'center' : "flex-start",
                }}
            >
                <Data />
            </Grid>
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        isMenuOpen: state.isMenuOpen,
        isPreviewMode: state.isPreviewMode,
        mdData: state.mdData
    };
};

export default connect(mapStateToProps, { setData })(Home);
