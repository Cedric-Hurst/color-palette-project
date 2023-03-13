import chroma from 'chroma-js';
import sizes from './sizes';

const styles = {
    root: {
        width: '100%',
        height: '100%',
        "&:hover svg": {
            color:'white',
        }
    },
    container: {
        width: '20%',
        height: '25%',
        display: 'inline-block',
        margin: '0 auto',
        position: 'relative',
        cursor: 'pointer',
        marginBottom: '-7px',
        "&:active": {
            zIndex: 9999
        },
        [sizes.down('xl')]: {
             width: '25%',
             height: '20%',
        },
         [sizes.down('lg')]: {
             width: '50%',
             height:'10%',
        },
         [sizes.down('sm')]: {
            width: '100%',
            height:'5%',
        },
    },
    boxContent: {
        position: 'absolute',
        padding: '10px',
        width: '100%',
        left: '0px',
        bottom: '0px',
        color: props => chroma(props.color).luminance() <= 0.1 ? 'rgba(255,255,255,0.5)' : 'black',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        fontSize: '12px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    deleteIcon: {
        color: props => chroma(props.color).luminance() <= 0.1 ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
        transition: 'all 0.3s ease-in-out',
        "&:hover": {
            scale: 1.5
        }
    }
}
export default styles;
