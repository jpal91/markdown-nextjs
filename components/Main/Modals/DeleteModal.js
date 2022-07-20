import React from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonBase from '@mui/material/ButtonBase'

import { deleteFromDB, masterUpdateHandler } from "../../../actions";
import deleteImage from '../../../public/images/delete.svg'

const DeleteModal = (props) => {
  const {
    setClose,
    deleteFromDB,
    fileName,
    masterUpdateHandler,
    saveState
  } = props;
  const router = useRouter();

  const handleDelete = async () => {
    // await deleteFromDB(fileName)
    //   .then(() => {
    //     setClose();
    //     router.push("/");
    //   })
    //   .catch(() => {
    //     setClose()
    //   })

    await masterUpdateHandler(saveState, "delete", fileName)
      .then(() => {
        setClose();
        router.push("/");
      })
      .catch(() => {
        setClose();
      });
  };

  return (
    <React.Fragment>
      <Grid item xs={12} sx={{ mt: 1, flexDirection: 'column', rowGap: '10px' }}>
        <Typography variant="sideNavHeading" align='center' sx={{ color: 'black', fontSize: '90%' }}>ARE YOU SURE YOU WANT TO DELETE?</Typography>
        <Typography variant='body1' sx={{ color: 'black' }}>This action cannot be undone. Are you sure you want to delete '{`${fileName}`}'?</Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ justifyContent: "space-evenly", maxHeight: "50px" }}
      >
        {/* <Button
          variant="contained"
          sx={{ backgroundColor: "blue" }}
          onClick={setClose}
        >
          No, cancel
        </Button> */}
        {/* <Button
          variant="contained"
          sx={{ backgroundColor: "red" }}
          onClick={handleDelete}
        >
          Yes, delete
        </Button> */}
        <ButtonBase sx={{ '&:hover': { opacity: '0.9' }}} onClick={handleDelete}>
          <Image src={deleteImage} />
        </ButtonBase>
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    fileName: state.fileName,
    saveState: state.saveState
  };
};

export default connect(mapStateToProps, { deleteFromDB, masterUpdateHandler })(
  DeleteModal
);
