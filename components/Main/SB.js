import { forwardRef } from "react";
import { SnackbarContent } from "notistack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';

const SB = forwardRef((props, ref) => {
    const colors = {
        error: 'red',
        success: 'green'
    }

    const icons = {
        error: <ErrorOutlineOutlinedIcon sx={{ color: 'white' }}/>,
        success: <DoneOutlineOutlinedIcon sx={{ color: 'white' }}/>,
    }
    
    return (
        <SnackbarContent ref={ref}>
            <Card sx={{ minWidth: '200px', minHeight: '50px', display: 'flex', alignItems: 'center', backgroundColor: colors[props.severity], justifyContent: 'center', p: 3, gap: '10px' }}>
                {icons[props.severity]}
                <Typography variant='sideNavHeading' sx={{ color: 'white' }}>{props.message}</Typography>
            </Card>
        </SnackbarContent>
    )
})

export default SB