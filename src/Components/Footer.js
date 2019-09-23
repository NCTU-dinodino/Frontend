import React from 'react'
import { connect } from 'react-redux'

const Footer = (props) => {
  const today = new Date()
  const year = today.getFullYear()

  return (
    <footer style={{ backgroundColor: props.color, zIndex: 10 }}>
      <div>Copyright @{year} NCTUCS 交通大學資訊工程學系</div>
      <div>連絡信箱：nctudinodino@gmail.com</div>
    </footer>
  )
}

const mapState = (state) => ({
  color: state.Student.User.FooterColor
})

const mapDispatch = (dispatch) => ({
})

export default connect(mapState, mapDispatch)(Footer)
