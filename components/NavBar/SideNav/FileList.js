import { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { useRouter } from 'next/router'
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const FileList = (props) => {
    const { listName, dbData } = props;
    const router = useRouter()
    const [open, setOpen] = useState(false);
    const [directoryData, setDirectory] = useState()
    const handleOpen = () => setOpen(!open);
    const directory = async () =>
        await axios.get("/api/examples").then((res) => setDirectory(res.data));

    useEffect(() => {
        if (listName === 'My Files') { return }
        directory()
    }, [])
    

    const buildList = () => {
        if (listName === "My Files") {
            return Object.keys(dbData.docs).map((doc, i) => {
                let targetDoc = dbData.docs[doc];

                return (
                    <ListItemButton key={i} onClick={() => router.push(`/${doc}`)}>
                        <ListItemText
                            primary={`${doc}`}
                            secondary={targetDoc.date}
                        />
                    </ListItemButton>
                );
            });
        } else if (listName === "Examples") {
            if (!directoryData) { return }
            return directoryData.map((file, i) => {
                file = file.replace(/\.md/, '')
                
                return (
                    <ListItemButton key={i} onClick={() => router.push(`/example/${file}`)}>
                        <ListItemText primary={file} />
                    </ListItemButton>
                );
            });
        }
    };

    return (
        <List sx={{ width: "100%", color: "white" }}>
            <ListItemButton onClick={handleOpen}>
                <ListItemText primary={listName} />
                {open ? <ExpandMore /> : <ExpandLess />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" sx={{ pl: 4 }}>
                    {buildList()}
                </List>
            </Collapse>
        </List>
    );
};

const mapStateToProps = (state) => {
    return {
        localData: state.localData,
        dbData: state.dbData,
    };
};

export default connect(mapStateToProps)(FileList);

// {Object.keys(dbData.docs).map((doc, i) => {
//     let targetDoc = dbData.docs[doc];

//     return (
//         <ListItemButton key={i}>
//             <ListItemText
//                 primary={`${doc}`}
//                 secondary={targetDoc.date}
//             />
//         </ListItemButton>
//     );
// })}
