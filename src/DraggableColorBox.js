import { withStyles } from 'react-jss'
import styles from './styles/DraggableColorBoxStyles'
function DraggableColorBox(props) {
    const {color, classes, name} = props;
    return (
        <div style={{backgroundColor: color}} className={classes.root}>
            {name}
        </div>
    )
}
export default withStyles(styles)(DraggableColorBox)