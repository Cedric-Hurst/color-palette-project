import React, { Component } from 'react'
import { v4 as uuid } from 'uuid'
import { Link } from 'react-router-dom';
import { withStyles } from 'react-jss'
import Navbar from './Navbar';
import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter';
import styles from './styles/PaletteStyles'
class SingleColorPalette extends Component { 
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
        const { classes } = this.props;
        const colorBoxes = this._shades.map(color =>
            <ColorBox key={uuid()} name={color.name} color={color[colorFormat]} showLink={false} />
        );
        return (
            <div className={classes.Palette}>
                 <Navbar
                    handleChange={this.changeFormat}
                    showSlider={false}
                />
                <div className={classes.colors}>
                    {colorBoxes}
                    <div className={classes.goBack}>
                        <Link to={`/palette/${id}`}>Go Back</Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={ emoji } />     
            </div>
        )
    }
}
export default withStyles(styles)(SingleColorPalette)