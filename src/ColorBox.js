import React, { Component } from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './ColorBox.css'
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import { withStyles } from 'react-jss'

const styles = {
    ColorBox: {
        width: '20%',
        height: props => props.showLink ? '25%': '50%',
        display: 'inline-block',
        margin: '0 auto',
        position: 'relative',
        cursor: 'pointer',
        marginBottom: '-4.5px',
        '&:hover button': {
            opacity: 1
        }
    },
    copyText: {
        color: props => chroma(props.color).luminance() >= 0.7 ? 'rgba(0,0,0,0.6)' : 'white'
    },
    colorName: {
        color: props => chroma(props.color).luminance() <= 0.1 ? 'white' : 'black'
    },
    moreBtn: {
        width: '60px',
        height: '30px',
        position: 'absolute',
        bottom: '0px',
        right: '0px',
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.3)',
        lineHeight: '30px',
        color: props => chroma(props.color).luminance() >= 0.7 ? 'rgba(0,0,0,0.6)' : 'white',
        textTransform: 'uppercase',
        border: 'none'
    },
    copyBtn: {
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
        color: props => chroma(props.color).luminance() >= 0.7 ? 'rgba(0,0,0,0.6)' : 'white',
        textTransform: 'uppercase',
        border: 'none',
        cursor: 'pointer',
        textDecoration: 'none',
        opacity: 0
    },
    boxContent: {
        position: 'absolute',
        padding: '10px',
        width: '100%',
        left: '0px',
        bottom: '0px',
        color: 'black',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        fontSize: '12px'
    },
    copyOverlay: {
        opacity: 0,
        zIndex: 0,
        width: '100%',
        height: '100%',
        transition: 'transform 0.6s ease-in-out',
        transform: 'scale(0.1)'
    },
    showOverlay: {
        opacity: 1,
        zIndex: 10,
        transform: 'scale(50)',
        position: 'absolute'
    },
    copyMsg: {
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '4rem',
        transform: 'scale(0.1)',
        opacity: 0,
        color: 'white',
        flexDirection: 'column',
        '& h1': {
            fontWeight: 100,
            textShadow: '1px 2px black',
            background: 'rgba(255, 255, 255, 0.3)',
            width: '100%',
            textAlign: 'center',
            marginBottom: 0,
            padding: '1rem',
            textTransform: 'uppercase'
        },
        '& p': {
            fontSize: '2rem',
            fontWeight: 100
        }
    },
    showMsg: {
        opacity: 1,
        transform: 'scale(1)',
        zIndex: 25,
        transition: 'all 0.4s ease-in-out',
        transitionDelay: '0.3s'
    },
}
class ColorBox extends Component { 
    constructor(props) { 
        super(props);
        this.state = {
            isCopied: false,
        }
        this.changeCopyState = this.changeCopyState.bind(this);
    }
    changeCopyState() {
        this.setState({ isCopied: true }, () =>{
            setInterval(() => {
                this.setState({ isCopied: false });
            }, 1500);
        });
        
    }
    render() { 
        const { name, color, paletteId, colorId, showLink, classes } = this.props;
        const { isCopied } = this.state;
        return (
            <CopyToClipboard text={color} onCopy={this.changeCopyState}>
                <div className={classes.ColorBox} style={{ background: color }}>
                    <div
                        className={`${classes.copyOverlay} ${isCopied && classes.showOverlay}`}
                        style={{ background: color }}
                    />
                    <div className={`${classes.copyMsg} ${isCopied && classes.showMsg}`}>
                        <h1 className={classes.copyText}>Copied!</h1>
                        <p className={classes.copyText}>{color}</p>
                    </div>
                    <div>
                        <div className={classes.boxContent}>
                            <span className={classes.colorName}>{name}</span>
                        </div>
                        <button className={classes.copyBtn}>Copy</button>
                    </div>
                    {showLink &&
                        <Link to={`/palette/${paletteId}/${colorId}`} onClick={e => e.stopPropagation()}>
                            <span className={classes.moreBtn}>MORE</span>
                        </Link>
                    }
                </div>
            </CopyToClipboard>
        )
    }
}
export default withStyles(styles)(ColorBox);