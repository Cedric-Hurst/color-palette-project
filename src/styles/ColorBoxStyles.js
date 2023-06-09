import chroma from 'chroma-js';
import sizes from './sizes';
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
        },
        [sizes.down('xl')]: {
             width: '25%',
             height: props => props.showLink ? '20%': '33.333%',
        },
         [sizes.down('lg')]: {
             width: '50%',
             height: props => props.showLink ? '10%': '20%',
        },
         [sizes.down('sm')]: {
            width: '100%',
            height: props => props.showLink ? '5%': '10%',
        },

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
            textTransform: 'uppercase',
            [sizes.down('sm')]: {
                fontSize: '5rem',
            },
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
    }
}
export default styles;