import React, { Component } from 'react'
import ColorBox from './ColorBox';
import { v4 as uuid } from 'uuid'
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import { Link } from 'react-router-dom';
import { withStyles } from 'react-jss'

const styles = {
    Palette: {
        height: '97vh',
        display: 'flex',
        flexDirection: 'column',
    },
    colors: {
        height: '90%',
    },
    goBack: {
        width: '20%',
        height: '50%',
        display: 'inline-block',
        margin: '0 auto',
        position: 'relative',
        cursor: 'pointer',
        marginBottom: '-4.5px',
        opacity: 1,
        backgroundColor: 'black',
        "& a": {
            width: '100px',
            height: '30px',
            position: 'absolute',
            display: 'inline-block',
            top: '50%',
            left: '50%',
            marginLeft: '-50px',
            marginTop: '-15px',
            textAlign: 'center',
            outline: 'none',
            background: 'rgba(255, 255, 255, 0.3)',
            fontSize: '1rem',
            lineHeight: '30px',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'none'
        }
    }

}
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