import sizes from './sizes';

const styles = {
    Palette: {
        height: '97vh',
        display: 'flex',
        flexDirection: 'column',
    },
    colors: {
        height: '90%',
    },
    goBack: {
        width: '20%',
        height: '50%',
        display: 'inline-block',
        margin: '0 auto',
        position: 'relative',
        cursor: 'pointer',
        marginBottom: '-4.5px',
        opacity: 1,
        backgroundColor: 'black',
        "& a": {
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
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'none'
        },
        [sizes.down('xl')]: {
             width: '25%',
             height: '33.333%',
        },
         [sizes.down('lg')]: {
             width: '50%',
             height: '20%',
        },
         [sizes.down('sm')]: {
            width: '100%',
            height: '10%',
        },
    }
}
export default styles;