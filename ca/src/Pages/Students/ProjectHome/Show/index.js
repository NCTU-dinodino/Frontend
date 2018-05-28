import './style.css'
import img from './1.jpg'
import React from 'react'
import { Image } from 'react-bootstrap'

export default class Show extends React.Component {
  render () {
    return (
      <div className='container'>
        <div className=' col-md-12 offset-1'>
          <div className='banner-wrapper'>
            <Image
              alt='無圖片'
              width='1200' height='400'
              src={this.props.show.image
                ? this.props.show.image
                : img}
              responsive
              rounded
            />
          </div>
          <div className='event-title'>{ this.props.show.title }</div>
          <div className='event-info-wrapper bg-white'>
            <div className='row'>
              <div className='col-7'>
                <p><i className='fa fa-share-alt' /> 團隊網站: <a href={this.props.show.url} style={{cursor: 'pointer'}}>{this.props.show.url}</a></p>
                <p><i className='glyphicon glyphicon-file' /> 團隊報告: <a href={this.props.show.file} style={{cursor: 'pointer'}}>點這裡</a></p>
                <p><i className='glyphicon glyphicon-user' /> 指導教授: {this.props.show.teacher}</p>
              </div>
            </div>
            <br />
            <div className='divide-horizontal '>
              <div className='divide-horizontal-span'>
                <p >專題簡介</p>
              </div>
            </div>
            <section dangerouslySetInnerHTML={{__html: this.props.show.introduce}} />
            <div className='pull-right'>
              <button className='btn btn-primary nav-button' onClick={this.props.onclick}>
                編輯
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}