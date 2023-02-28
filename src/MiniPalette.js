import React from 'react'
import { withStyles } from 'react-jss'
import { Link } from 'react-router-dom'


const styles = {
    link: {
        textDecoration: 'none',
    },
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
        backgroundColor: "grey",
    },
    title: {
        display: "flex",
        justifyContent: "space-between",
        margin: "0",
        alignItems: "center",
        color: "black",
        paddingTop: "0.5rem",
        fontSize: "1rem",
        position: "relative"
    },
    emoji: {
        marginLeft: "0.5rem",
        fontSize: "1.5rem",

    }
}

function MiniPalette(props) {
    const {classes, paletteName, emoji, id, colors} = props;
    return (
        <Link key={id} className={classes.link}>
            <div className={classes.root}>
                <div className={classes.colors}></div>
                <h5 className={classes.title}>{paletteName} <span className={classes.emoji}>{emoji}</span></h5>
            </div>
        </Link>
    )
}
export default withStyles(styles)(MiniPalette);