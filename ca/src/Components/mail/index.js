import React from 'react'
import './index.css'
import axios from 'axios'

//for table
import Table from './Table'
import FlatButton from 'material-ui/FlatButton'

//for multiTheme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const styles = {
  filter: {
    padding: '50px 4% 0 8%',
  },
}

export default class Mail extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      data: [],
      action:'mail',

    }

    this.filterList = this.filterList.bind(this)
  }

  componentDidMount () {
    this.setState({items: this.props.items})
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.items !== this.props.items) {
      this.setState({items: nextProps.items})
    }
  }

  filterList (event) {
    let updatedList = this.props.items
    updatedList = updatedList.filter((item) => {
      return (
        (item.tname.toLowerCase().search(
          event.target.value.toLowerCase()) !== -1)
      )
    })
    this.setState({items: updatedList})
  }

  searchCallback = (item) => {
    this.props.parentFunction(item)
  }

  handlemailaction = () => {
    let _this = this
    axios.post('/students/mail/sent', {
      id: _this.props.id
    })
      .then(res => {
        this.setState({
          action:'sent',
          data:res.data
        })
      })
      .catch(err => {
        //window.location.replace("/logout ");
        console.log(err)
      })
  }

  render () {
    return (
      <div style={styles.filter}>
        <div className='mail-button-list'>
          <FlatButton label='收件夾'
                      backgroundColor='#D3D3D3'
                      labelStyle={{
                        fontFamily: 'Noto Sans CJK TC',
                        fontWeight: 'bold',
                        color:'#778899'
                      }}
                      style={{width:'15vw', margin:'5'}}
          />
          <FlatButton label='寄件備份'
                      backgroundColor='#D3D3D3'
                      labelStyle={{
                        fontFamily: 'Noto Sans CJK TC',
                        fontWeight: 'bold',
                        color:'#778899'
                      }}
                      style={{width:'15vw', margin:'5'}}
                      onClick={this.handlemailaction}
          />
        </div>
        <div style={{width:'70vw',float:'right'}}>
          <div className="filter-list">
            <input type="text"
                   placeholder="搜尋"
                   onChange={this.filterList}
            />
          </div>
          <div
            style = {{
              overflow:'scroll',
              height:'65vh'
            }}>
            <MuiThemeProvider>
              <Table tableData={this.state.data}
                     action={this.state.action}
                     parentFunction={this.searchCallback}
              />
            </MuiThemeProvider>
          </div>
        </div>
      </div>
    )
  }
}
