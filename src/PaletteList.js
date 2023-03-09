import React from 'react'
import MiniPalette from './MiniPalette'
import { withStyles } from 'react-jss'
import {v4 as uuid} from 'uuid'
import styles from './styles/PaletteListStyles'
import { Link } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import { blue, red } from '@mui/material/colors';


function PaletteList(props) { 
    const [open, setOpen] = React.useState(false);
    const [id, setId] = React.useState('');

    const handleClickOpen = (paletteId) => {
        setOpen(true);
        setId(paletteId);
    };
    const handleClose = () => {
        setOpen(false);
        setId('');
    };
    const handleDelete = (e) => { 
        deletePalette(id);
        handleClose();
    }
        const {palettes, classes, deletePalette} = props
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>React Colors</h1>
                        <Link to='/palette/new'>Create New Palette</Link>
                    </nav>
                    <TransitionGroup className={classes.palettes}>
                        {palettes.map(palette =>
                            <CSSTransition key={palette.id} classNames='fade' timeout={500}>
                                <MiniPalette key={uuid()}{...palette} openDialog={handleClickOpen} />
                            </CSSTransition>
                        )}
                    </TransitionGroup>
                </div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Delete this Palette?</DialogTitle>
                    <List sx={{ pt: 0 }}>
                        <ListItem disableGutters>
                            <ListItemButton onClick={handleDelete} >
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                        <CheckIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={'Delete'} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemButton onClick={handleClose} >
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: red[100], color: red[600] }}>
                                        <ClearIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={'Cancel'} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        )
}
export default withStyles(styles)(PaletteList);