
import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  footer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    padding: '8px 5%',
    backgroundColor: '#6c6c6c',
    fontSize: 14,
    zIndex: 10,
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'initial'
    }
  },
  link: {
    position: 'absolute',
    right: '5%',
    color: '#fcfcfc',
    fontSize: 16,
    [theme.breakpoints.down('xs')]: {
      fontSize: 14
    }
  }
})

const Footer = ({ classes }) => {
  const today = new Date()
  const year = today.getFullYear()

  return (
    <footer className={classes.footer}>
      <div className={classes.center}>
        <div>Copyright @{year} NCTUCS</div>
      </div>
      <a
        className={classes.link}
        href='https://docs.google.com/forms/d/e/1FAIpQLSdrPx50wv88f_dvcdWl4hYazYE39bVqVaF8oInEAGTZtg8SOQ/viewform'
        target='_blank'
        rel='noopener noreferrer nofollow'
      >
        問題回報
      </a>
    </footer>
  )
}

export default withStyles(styles)(Footer)
