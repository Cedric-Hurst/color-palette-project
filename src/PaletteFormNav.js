import * as React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PaletteIcon from '@mui/icons-material/Palette';import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { withStyles } from 'react-jss';
import PaletteMetaForm from './PaletteMetaForm';
import styles from './styles/PaletteFormNavStyles';
import { DRAWER_WIDTH as drawerWidth } from './constants';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '64px',
    alignItems: 'center',
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
                        {!open && <PaletteIcon color='action'/>}
                    </IconButton>
                    <Typography variant="h6" noWrap component="div"  className={classes.title}>
                        Create New Color Palette
                    </Typography>
                </Toolbar>
                <div className={classes.navBtns}>
                    <Stack direction="row">
                        <Link to="/" style={{textDecoration: 'none'}}>
                            <Button variant="contained" color="secondary" className={classes.btn}>Go Back</Button>
                        </Link>
                        <PaletteMetaForm
                            handlePaletteSave={handlePaletteSave}
                            newPaletteName={newPaletteName}
                            handleTextChange={handleTextChange}
                            className={classes.btn}
                        />
                    </Stack>
                </div>
            </AppBar>
        </div>
    )
}
export default withStyles(styles)(PaletteFormNav)