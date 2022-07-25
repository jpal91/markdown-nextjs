import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { toggleMenu, setLoading } from "../../../actions";

const FileList = (props) => {
    const { listName, dbData, toggleMenu, localData, setLoading } = props;
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [directoryData, setDirectory] = useState();
    const [guideDirectoryData, setGuideDirectory] = useState();
    const handleOpen = () => setOpen(!open);

    const directory = async () =>
        await axios.get("/api/examples").then((res) => setDirectory(res.data));
    const guideDirectory = async () =>
        await axios
            .get("/api/guides")
            .then((res) => setGuideDirectory(res.data));

    useEffect(() => {
        if (listName === "My Files") {
            return;
        }
        directory();
        guideDirectory();
    }, []);

    const buildList = () => {
        if (listName === "My Files") {
            const dbDataKeys = Object.keys(dbData.docs);
            const localDataKeys = Object.keys(localData.docs);

            const dbList =
                dbDataKeys &&
                dbDataKeys.map((doc, i) => {
                    let targetDoc = dbData.docs[doc];

                    return (
                        <ListItemButton
                            key={"db-" + i}
                            onClick={() => {
                                toggleMenu(false);
                                setOpen(false);
                                setLoading(true);
                                router.push(`/db/${doc}`);
                            }}
                            aria-label="Open document"
                            title={`${doc} - saved on database`}
                        >
                            <ListItemText
                                primary={`${doc}`}
                                secondary={`${targetDoc.date} - DB`}
                            />
                        </ListItemButton>
                    );
                });
            const localList =
                localDataKeys &&
                localDataKeys.map((doc, i) => {
                    let targetDoc = localData.docs[doc];

                    return (
                        <ListItemButton
                            key={"local-" + i}
                            onClick={() => {
                                toggleMenu(false);
                                setOpen(false);
                                setLoading(true);
                                router.push(`/local/${doc}`);
                            }}
                            aria-label="Open document"
                            title={`${doc} - saved on local computer`}
                        >
                            <ListItemText
                                primary={`${doc}`}
                                secondary={targetDoc.date}
                            />
                        </ListItemButton>
                    );
                });
            return [dbList, localList];
        } else if (listName === "Examples") {
            if (!directoryData) {
                return;
            }
            return directoryData.map((file, i) => {
                file = file.replace(/\.md/, "");

                return (
                    <ListItemButton
                        key={i}
                        onClick={() => {
                            toggleMenu(false);
                            setOpen(false);
                            setLoading(true);
                            router.push(`/example/${file}`);
                        }}
                        aria-label="Open document"
                        title={`${file} - example document`}
                    >
                        <ListItemText primary={file} />
                    </ListItemButton>
                );
            });
        } else if (listName === "Guides") {
            if (!guideDirectoryData) {
                return;
            }
            return guideDirectoryData.map((file, i) => {
                file = file.replace(/\.md/, "");

                return (
                    <ListItemButton
                        key={i}
                        onClick={() => {
                            toggleMenu(false);
                            setOpen(false);
                            setLoading(true);
                            router.push(`/guides/${file}`);
                        }}
                        aria-label="Open document"
                        title={`${file} - guide document`}
                    >
                        <ListItemText primary={file} />
                    </ListItemButton>
                );
            });
        }
    };

    return (
        <React.Fragment>
            <List sx={{ width: "100%", color: "white" }}>
                <ListItemButton onClick={handleOpen}>
                    <ListItemText
                        primary={listName}
                        aria-label={listName}
                        title={listName}
                    />
                    {open ? <ExpandMore /> : <ExpandLess />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" sx={{ pl: 4 }}>
                        {buildList()}
                    </List>
                </Collapse>
            </List>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        localData: state.localData,
        dbData: state.dbData,
    };
};

export default connect(mapStateToProps, { toggleMenu, setLoading })(FileList);
