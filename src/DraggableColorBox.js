import { withStyles } from 'react-jss'
import styles from './styles/DraggableColorBoxStyles'
function DraggableColorBox(props) {
    const {color, classes} = props;
    return (
        <div style={{backgroundColor: color}} className={classes.root}>
            {color}
        </div>
    )
}
export default withStyles(styles)(DraggableColorBox)