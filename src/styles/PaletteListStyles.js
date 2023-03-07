import sizes from './sizes';

const styles = {
    root: {
        backgroundColor: "blue",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingBottom: "9rem",
       
    },
    container: {
        width: "50%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap",
        [sizes.down('xxl')]: {
            width: '80%',
        },
        [sizes.down('sm')]: {
            width: '70%',
        },
    },
    nav: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        color: "white",
        alignItems: "center",
        "& a": {
            color: "white",
        }
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3,30%)",
        gridGap: "1.5rem",
        [sizes.down('lg')]: {
            gridTemplateColumns: "repeat(2,50%)",
        },
        [sizes.down('sm')]: {
            gridTemplateColumns: "repeat(1,100%)",
        },
    }
}
export default styles;