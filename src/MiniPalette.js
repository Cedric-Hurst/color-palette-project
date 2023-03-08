import React from 'react'
import { withStyles } from 'react-jss'
import { useNavigate } from 'react-router-dom'
import {v4 as uuid} from 'uuid'
import styles from './styles/MiniPaletteStyles'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

function MiniPalette({ classes, paletteName, emoji, id, colors, openDialog }) {
    const navigate = useNavigate();
    const handleClick = e => {
        e.preventDefault();
        navigate(`/palette/${id}`);
    }
    const handleOpen = (e) => { 
        e.stopPropagation();
        openDialog(id)
    }
    return (
        <div className={classes.root} onClick={handleClick}>
            <DeleteOutlinedIcon
                className={classes.deleteIcon}
                style={{ transition: 'all 0.3s ease-in-out' }}
                onClick={handleOpen}
            />
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