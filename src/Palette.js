import React, { Component } from 'react'
import ColorBox from './ColorBox'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Palette.css'

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
                <div className='slider'>
                    <Slider
                        defaultValue={level}
                        min={100}
                        max={900}
                        onChange={this.changeLevel}
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
                <div className='Palette-colors'>
                    {colorBoxes}
                </div>
                
            </div>
        )
    }
}