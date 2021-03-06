
import React from 'react'
import FadeIn from 'react-fade-in'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Button } from '@material-ui/core'
import { ResponsiveContainer } from '../../Components/Responsive'
import dinoIcon from '../../Resources/dinodino_login_graduate.png'

const styles = theme => ({
  container: {
    backgroundColor: '#eee'
  },
  img: {
    height: '220px',
    marginTop: '30vh',
    [theme.breakpoints.down('md')]: {
      height: '175px'
    },
    [theme.breakpoints.down('sm')]: {
      height: '140px'
    },
    [theme.breakpoints.down('xs')]: {
      height: '90px'
    },
  },
  button: {
    marginTop: '15px',
    boxShadow: 'none',
    backgroundColor: '#68bb66',
    color: '#fcfcfc',
    fontSize: '16px',
    '&:hover': {
      backgroundColor: '#74c072',
      color: '#fcfcfc'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px'
    },
  }
}) 

const Login = ({ classes }) => (
  <FadeIn>
    <div className={classes.container}>
      <ResponsiveContainer>
        <Grid item xs={12} container justify='center'>
          <img className={classes.img} src={dinoIcon} alt='' />
        </Grid>
        <Grid item xs={12} container justify='center'>
          <Grid item xs={4} sm={3} md={2} container justify='center'>
            <Button
              variant='contained'
              className={classes.button}
              children='LOGIN'
              href='/auth/Nctu'
              fullWidth
            />
          </Grid>
        </Grid>
      </ResponsiveContainer>
    </div>
  </FadeIn>
)

const withFailLoginInfo = (Component) => {
  const failLoginInfo = (props) => {
    const { location } = props
    let err = new URLSearchParams(location.search).get('fail')
    if (err != null) {
      window.alert('登入失敗\n無效的帳戶或系統錯誤。\n注意本系統僅供交大資工學士班學生及教職員使用。\n若有任何問題，請使用右下角問題回報功能。')
    }
    return <Component {...props} />
  }
  return failLoginInfo
}

export default withFailLoginInfo(withStyles(styles)(Login))