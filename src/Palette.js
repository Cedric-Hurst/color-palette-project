import React, { Component } from 'react'
import ColorBox from './ColorBox'
import './Palette.css'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default class Palette extends Component { 
    constructor(props) { 
        super(props);
        this.state = {
            level: 500
        }
        this.changeLevel = this.changeLevel.bind(this);
    }
    changeLevel(level) { 
        this.setState({ level });
    }
    render() { 
        const { level } = this.state;
        const { colors } = this.props.palette;
        const colorBoxes = colors[level].map(color =>
            <ColorBox color={color.hex} name={color.name} />)
        return (
            <div className='Palette'>
                <Slider
                    defaultValue={level}
                    min={100}
                    max={900}
                    onChange={this.changeLevel}
                    step={100}
                />
                <div className='Palette-colors'>
                    {colorBoxes}
                </div>
                
            </div>
        )
    }
}