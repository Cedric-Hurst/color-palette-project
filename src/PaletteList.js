import React, { Component } from 'react'
import MiniPalette from './MiniPalette'
import { withStyles } from 'react-jss'
import {v4 as uuid} from 'uuid'
import styles from './styles/PaletteListStyles'
class PaletteList extends Component { 
 
    render() {
        const {palettes, classes} = this.props
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>React Colors</h1>
                    </nav>
                    <div className={classes.palettes}>
                        {palettes.map(palette =>
                            <MiniPalette key={uuid()}{...palette} />
                        )}
                    </div>
                </div>
            </div>
        )
    }
}
export default withStyles(styles)(PaletteList);