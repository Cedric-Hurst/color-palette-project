import React, { Component } from 'react'
import MiniPalette from './MiniPalette'
import { withStyles } from 'react-jss'
import {v4 as uuid} from 'uuid'
import styles from './styles/PaletteListStyles'
import { Link } from 'react-router-dom'
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
class PaletteList extends Component { 
 
    render() {
        const {palettes, classes, deletePalette} = this.props
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>React Colors</h1>
                        <Link to='/palette/new'>Create New Palette</Link>
                    </nav>
                    <TransitionGroup className={classes.palettes}>
                        {palettes.map(palette =>
                            <CSSTransition key={palette.id} classNames='fade' timeout={500}>
                                <MiniPalette key={uuid()}{...palette} deletePalette={deletePalette} />
                            </CSSTransition>
                        )}
                    </TransitionGroup>
            </div>
            </div>
        )
    }
}
export default withStyles(styles)(PaletteList);