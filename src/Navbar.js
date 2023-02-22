import React, { Component } from 'react'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default class Navbar extends Component { 
    constructor(props) {
        super(props);
        this.state = {colorFormat: 'hex'};
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(evt) {
        this.setState({ colorFormat: evt.target.value });
        this.props.handleChange(evt.target.value);
    }
    render() {
        const { level, changeLevel } = this.props
        const { colorFormat } = this.state;
        return (
            <header className='Navbar'>
                <div className="logo">
                    <a href='#'>React Color Picker</a>
                </div>
                <div className='slider-container'>
                    <span>Level: {level}</span>
                    <div className='slider'>
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
                <div className='select-container'>
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
            </header>
        )
    }
}