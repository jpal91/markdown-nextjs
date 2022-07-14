import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ScrollSync } from "react-scroll-sync";
import Container from "@mui/material/Container";

import { setData } from "../../actions";
import TextArea from "./TextArea";
import Preview from "./Preview";

const MainApp = (props) => {
  const { isMenuOpen, setData } = props;

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
        setData(e.target.value);
      }
    });
  }, []);

  return (
    <React.Fragment>
      <ScrollSync>
        <Container
          sx={{
            maxWidth: "100% !important",
            height: "100%",
            maxHeight: "937px",
            justifyContent: "space-evenly",
            p: "0px !important",
            width: isMenuOpen ? "calc(100% - 240px)" : "100%",
            ml: isMenuOpen ? "240px" : 0
          }}
        >
          <TextArea />
          <Preview />
        </Container>
      </ScrollSync>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isMenuOpen: state.isMenuOpen
  };
};

export default connect(mapStateToProps, { setData })(MainApp);
