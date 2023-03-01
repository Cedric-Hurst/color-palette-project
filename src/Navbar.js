import React, { Component } from 'react'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import styles from './styles/NavbarStyles'
import withStyles from 'react-jss';

class Navbar extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            colorFormat: 'hex',
            open: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleChange(evt) {
        this.setState({ colorFormat: evt.target.value, open: true });
        this.props.handleChange(evt.target.value);
    }
    handleClose(evt, reason) {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ open: false });
    }
 
    render() {
        const { level, changeLevel, showSlider, classes } = this.props
        const { colorFormat, open } = this.state;
        return (
            <header className={classes.Navbar}>
                <div className={classes.logo}>
                    <Link to='/'>React Color Picker</Link>
                </div>
                {showSlider &&
                    <div>
                        <span>Level: {level}</span>
                        <div className={classes.slider}>
                            <Slider
                                defaultValue={level}
                                min={100}
                                max={900}
                                onChange={changeLevel}
                                step={100}
                                trackStyle={{ backgroundColor: 'transparent' }}
                                railStyle={{ height: '8px' }}
                                handleStyle={{
                                    backgroundColor: ' green',
                                    outline: 'none',
                                    border: '2px solid green',
                                    boxShadow: 'none',
                                    height: '13px',
                                    width: '13px',
                                    marginLeft: '-7px',
                                    marginTop: '-3px'
                                }}
                            />
                        </div>
                    </div>
                }
                <div className={classes.selectContainer}>
                    <Box sx={{ minWidth: 100 }}>
                        <FormControl fullWidth>
                            <InputLabel id="select">Color Format</InputLabel>
                            <Select
                                labelId="select"
                                id="color-select"
                                value={colorFormat}
                                label="Color Format"
                                onChange={this.handleChange}
                            >
                                <MenuItem value="hex">HEX - #ffffff</MenuItem>
                                <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
                                <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                <Snackbar
                    open={open}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                    message={`Color Format changed to ${colorFormat.toUpperCase()}`}
                    action={[
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={this.handleClose}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    ]}
                />
            </header>
        )
    }
}
export default withStyles(styles)(Navbar);