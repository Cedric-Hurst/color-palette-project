import React, { Component } from 'react'
import ColorBox from './ColorBox';
import {v4 as uuid} from 'uuid'

export default class SingleColorPalette extends Component { 
    constructor(props) {
        super(props);
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
        console.log(this._shades)
    }
    gatherShades(palette, colorToFilterBy) {
        let shades = [];
        let allColors = palette.colors;

        for (let key in allColors) { 
            shades = shades.concat(allColors[key].filter(color => color.id === colorToFilterBy));
        }
        shades.shift(); // remove the first color because its always just white
        return shades;
    }
    render() {
        const colorBoxes = this._shades.map(color =>
            <ColorBox key={uuid()} name={color.name} color={color.hex} showLink={false} />
        );
        return (
            <div className='Palette'>
                <h1>Single Color Palette</h1>
                <div className='Palette-colors'>
                    {colorBoxes}
                </div>
            </div>
        )
    }
}