import sizes from './sizes';

const styles = {
    Navbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '6vh',
    },
    slider: {
        width: '340px',
        margin: '0 10px',
        display: 'inline-block',
         [sizes.down('lg')]: {
             width: '240px',
        },
         [sizes.down('md')]: {
             width: '200px',
        },
    },
    logo: {
        marginRight: '15px',
        padding: '0 13px',
        fontSize: '22px',
        backgroundColor: '#eceff1',
        fontFamily: 'Roboto',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        "& a": {
            textDecoration: 'none',
            color: 'black',
        },
        [sizes.down('sm')]: {
           display: props => props.showSlider && 'none'
        },
    },
    selectContainer: {
        marginLeft: 'auto',
        marginRight: '1rem',
    }
}
export default styles;