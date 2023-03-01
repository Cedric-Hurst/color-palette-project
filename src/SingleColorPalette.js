import React, { Component } from 'react'
import ColorBox from './ColorBox';
import { v4 as uuid } from 'uuid'
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import { Link } from 'react-router-dom';

export default class SingleColorPalette extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            colorFormat: 'hex'
        }
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
        this.changeFormat = this.changeFormat.bind(this);
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
    changeFormat(val) {
        this.setState({colorFormat: val});
    }
    render() {
        const { colorFormat } = this.state;
        const { paletteName, emoji, id } = this.props.palette;
        const colorBoxes = this._shades.map(color =>
            <ColorBox key={uuid()} name={color.name} color={color[colorFormat]} showLink={false} />
        );
        return (
            <div className='SingleColorPalette Palette'>
                 <Navbar
                    handleChange={this.changeFormat}
                    showSlider={false}
                />
                <div className='Palette-colors'>
                    {colorBoxes}
                    <div className='goBack ColorBox'>
                        <Link to={`/palette/${id}`} className='back-btn'>Go Back</Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={ emoji } />     
            </div>
        )
    }
}