
import React from 'react'
import { connect } from 'react-redux'
import { update_timer_signal } from '../Redux/Index/Actions'

class Wrapper extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      // 如果連續15分鐘沒有call API就自動導向登入頁面
      // 因為後端設定連線時間為20分鐘(前端故意設定略小於後端)，call API後端也會重置時間
      logoutTime: 1000 * 60 * 15
    }
    this.setTimer = this.setTimer.bind(this)
    this.clearTimer = this.clearTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
  }

  componentDidMount () {
    if (window.location.pathname !== '/' && window.location.pathname !== '/logout') {
      this.setTimer()
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.signal) {
      this.resetTimer()
      this.props.updateTimerSignal(false)
    }
  }

  setTimer () {
    this.timer = setTimeout(this.logout, this.state.logoutTime)
  }

  clearTimer () {
    clearTimeout(this.timer)
  }

  resetTimer () {
    this.clearTimer()
    this.setTimer()
  }

  logout () {
    window.location.assign('/')
  }

  render () {
    return this.props.children
  }
}

const mapStateToProps = (state) => ({
  signal: state.Index.timer_signal
})

const mapDispatchToProps = (dispatch) => ({
  updateTimerSignal: (signal) => dispatch(update_timer_signal(signal))
})

const AutoLogoutWrapper = connect(mapStateToProps, mapDispatchToProps)(Wrapper)

const AutoLogout = (ChildComponent) => () => (
  <AutoLogoutWrapper>
    <ChildComponent />
  </AutoLogoutWrapper>
)

export default AutoLogout
