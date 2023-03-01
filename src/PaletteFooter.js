import styles from './styles/PaletteFooterStyles'
import withStyles from 'react-jss';
function PaletteFooter(props) {
    const { paletteName, emoji } = props;
    return (
        <footer className='Palette-footer'>
            {paletteName}
            <span className='emoji'>{emoji}</span>
        </footer>
    );
}
export default withStyles(styles)(PaletteFooter);