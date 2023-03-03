import * as React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { withStyles } from 'react-jss';
import PaletteMetaForm from './PaletteMetaForm';

const drawerWidth = 400;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '64px',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const styles = {
    navBtns: {
    
    },
    root: {
        display: 'flex',
        
    }
}
function PaletteFormNav(props) {
    const { open, handleDrawerOpen, handlePaletteSave, newPaletteName, handleTextChange, classes } = props;
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" open={open} color="default">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Create New Color Palette
                    </Typography>
                </Toolbar>
                <div className={classes.navBtns}>
                    <Stack direction="row">
                        <Link to="/" style={{textDecoration: 'none'}}>
                            <Button variant="contained" color="secondary">Go Back</Button>
                        </Link>
                        <PaletteMetaForm
                            handlePaletteSave={handlePaletteSave}
                            newPaletteName={newPaletteName}
                            handleTextChange={handleTextChange}
                        />
                    </Stack>
                </div>
            </AppBar>
        </div>
    )
}
export default withStyles(styles)(PaletteFormNav)