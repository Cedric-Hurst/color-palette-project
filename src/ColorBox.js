import React, { Component } from 'react'
import './ColorBox.css'

export default class ColorBox extends Component { 
    render() { 
        const { name, color } = this.props;
        return (
            <div className='ColorBox' style={{ background: color }}>
                <div className='copy-container'>
                    <div className='box-content'>
                        <span>{name}</span>
                    </div>
                    <button className='copy-btn'>Copy</button>
                </div>
                <span className='more-btn'>MORE</span>
            </div>
        )
    }
}