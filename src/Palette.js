import React, { Component } from 'react'
import ColorBox from './ColorBox'
import './Palette.css'
import Navbar from './Navbar';

export default class Palette extends Component { 
    constructor(props) { 
        super(props);
        this.state = {
            level: 500,
            colorFormat: 'hex'
        }
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    }
    changeLevel(level) { 
        this.setState({ level });
    }
    changeFormat(val) {
        this.setState({colorFormat: val});
    }
    render() { 
        const { level, colorFormat } = this.state;
        const { colors, emoji, paletteName, id } = this.props.palette;
        const colorBoxes = colors[level].map(color =>
            <ColorBox
                color={color[colorFormat]}
                name={color.name}
                key={color.id}
                paletteId={id}
                colorId={color.id}
            />
        )
        return (
            <div className='Palette'>
                <Navbar
                    level={level}
                    changeLevel={this.changeLevel}
                    handleChange={this.changeFormat}
                />
                <div className='Palette-colors'>
                    {colorBoxes}
                </div>
                <footer className='Palette-footer'>
                    {paletteName}
                    <span className='emoji'>{emoji}</span>
                </footer>
                
            </div>
        )
    }
}