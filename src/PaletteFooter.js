import styles from './styles/PaletteFooterStyles'
import withStyles from 'react-jss';
function PaletteFooter(props) {
    const { paletteName, emoji, classes } = props;
    return (
        <footer className={classes.PaletteFooter}>
            {paletteName}
            <span className={classes.emoji}>{emoji}</span>
        </footer>
    );
}
export default withStyles(styles)(PaletteFooter);