import React, { Component } from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './ColorBox.css'
import { Link } from 'react-router-dom';

export default class ColorBox extends Component { 
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
        const { name, color, paletteId, colorId, showLink } = this.props;
        const {isCopied} = this.state;
        return (
            <CopyToClipboard text={color} onCopy={this.changeCopyState}>
                <div className='ColorBox' style={{ background: color }}>
                    <div
                        className={`copy-overlay ${isCopied && 'show'}`}
                        style={{ background: color }}
                    />
                    <div className={`copy-msg ${isCopied && 'show'}`}>
                        <h1>copied!</h1>
                        <p>{color}</p>
                    </div>
                    <div className='copy-container'>
                        <div className='box-content'>
                            <span>{name}</span>
                        </div>
                        <button className='copy-btn'>Copy</button>
                    </div>
                    {showLink &&
                        <Link to={`/palette/${paletteId}/${colorId}`} onClick={e => e.stopPropagation()}>
                            <span className='more-btn'>MORE</span>
                        </Link>
                    }
                </div>
            </CopyToClipboard>
        )
    }
}