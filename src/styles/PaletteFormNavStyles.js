import sizes from './sizes';

const styles = {
    navBtns: {
        marginRight: "1rem",
    },
    root: {
        display: 'flex',
    },
    btn: {
        margin: '0 0.5rem',
    },
    title: {
        [sizes.down('sm')]: {
            display: 'none'
        },
    }
}
export default styles;