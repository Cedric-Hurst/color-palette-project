import React from 'react'
import { withStyles } from 'react-jss'
import { useNavigate } from 'react-router-dom'
import {v4 as uuid} from 'uuid'
import styles from './styles/MiniPaletteStyles'

function MiniPalette({ classes, paletteName, emoji, id, colors }) {
    const navigate = useNavigate();
    const handleClick = e => {
        e.preventDefault();
        navigate(`/palette/${id}`);
    }
    return (
            <div className={classes.root} onClick={handleClick}>
                <div className={classes.colors}>
                    {colors.map(color =>
                        <div
                            className={classes.miniColor}
                            style={{ backgroundColor: color.color }}
                            key={uuid()}
                        />
                    )}
                </div>
                <h5 className={classes.title}>{paletteName} <span className={classes.emoji}>{emoji}</span></h5>
            </div>
    )
}
export default withStyles(styles)(MiniPalette);