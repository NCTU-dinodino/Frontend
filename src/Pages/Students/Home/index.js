import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import img1 from '../../../Resources/index01.png'
import img2 from '../../../Resources/index02.jpg'
import img3 from '../../../Resources/index03.png'
import img4 from '../../../Resources/index04.png'

const styles = theme => ({
  image: {
    width: '100%'
  }
})

const Home = ({ classes }) => (
  <div>
    <Link to='/students/grad'>
      <img alt='' src={img1} className={classes.image} />
    </Link>
    <Link to='/students/map'>
      <img alt='' src={img2} className={classes.image} />
    </Link>
    <Link to='/students/credit'>
      <img alt='' src={img3} className={classes.image} />
    </Link>
    <img alt='' src={img4} className={classes.image} />
  </div>
)

export default withStyles(styles)(Home)
