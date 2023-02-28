import React from 'react'
import { withStyles } from 'react-jss'
import { useNavigate } from 'react-router-dom'


const styles = {
    root: {
        backgroundColor: "white",
        border: '1px solid black',
        borderRadius: "5px",
        padding: "0.5rem",
        position: "relative",
        overflow: "hidden",
        "&:hover": {
            cursor: "pointer"
        }
    },
    colors: {
        backgroundColor: "#dae1e4",
        height: "150px",
        width: "100%",
        borderRadius: "5px",
        overflow: "hidden"
    },
    miniColor: {
        height: "25%",
        width: "20%",
        display: "inline-block",
        margin: "0 auto",
        position: "relative",
        marginBottom: "-4px"
    },
    title: {
        display: "flex",
        justifyContent: "space-between",
        margin: "0",
        alignItems: "center",
        color: "black",
        paddingBottom: "0.8rem",
        fontSize: "1rem",
        position: "relative"
    },
    emoji: {
        marginLeft: "0.5rem",
        fontSize: "1.5rem",

    }
}

function MiniPalette(props) {
    const { classes, paletteName, emoji, id, colors } = props;
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
                            key={color.name}
                        />
                    )}
                </div>
                <h5 className={classes.title}>{paletteName} <span className={classes.emoji}>{emoji}</span></h5>
            </div>
    )
}
export default withStyles(styles)(MiniPalette);