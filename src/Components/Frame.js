
import React from 'react'
import FadeIn from 'react-fade-in'

const Frame = (props) => (
  // navbar 56px, footer 48px
  <div style={{ background: '#F5F5F5', minHeight: 'calc(100vh - 56px - 48px)' }}>
    <FadeIn>
      {props.children}
    </FadeIn>
  </div>
)

export default Frame
