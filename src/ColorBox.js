import React, { Component } from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import { withStyles } from 'react-jss'
import styles from './styles/ColorBoxStyles'
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