//import styles from '../styles/Home.module.css'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import TextareaAutosize from '@mui/base/TextareaAutosize';
import InputBase from '@mui/material/InputBase'
import Input from '@mui/material/Input'
import Box from '@mui/material/Box'


export default function Home() {
    //const vp = window.visualViewport
    
    return (
        <Container sx={{ maxWidth: '100% !important', height: '100%', maxHeight: '937px' , justifyContent: 'space-evenly', p: '0px !important' }}>
            <Grid xs={6} sx={{ width: '100%', height: '100%', p: 5 }}>
                <TextField multiline variant='standard' sx={{ width: '100%', overflow: 'auto'}} minRows={30} InputProps={{ disableUnderline: 'true' }}/>
        
            </Grid>
            <Grid xs={6} sx={{ width: '100%', height: 'calc(100vh - 72px)', backgroundColor: 'background.secondary', flex: '1 1 auto'}}>
                Thing2
            </Grid>
        </Container>
    )
}
// <TextField varint='outlined' fullWidth multiline sx={{ height: '100%' }} maxRows={50} InputProps={{ classes: { input: {height: 2000} } }}/>