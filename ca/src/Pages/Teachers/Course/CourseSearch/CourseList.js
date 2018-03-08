import React from 'react'
import './CourseList.css'

//for table
import CourseTable from './CourseTable'

//for multiTheme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const styles = {
  filter: {
    padding: '50px 4% 0 8%',
  },
}

export default class StudentList extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      initItems: this.props.items,
      items: [],

    }

    this.filterList = this.filterList.bind(this)
  }

  componentDidMount () {
    this.setState({items: this.state.initItems})
  }

  componentWillReceiveProps(nextProps){
    if( nextProps.items !== this.props.items ) {
      this.setState({initItems: this.props.items});
    }
  }

  filterList (event) {
    let updatedList = this.state.initItems;
    updatedList = updatedList.filter( (item) => {
      return (
        (item.unique_id.toLowerCase().search(
          event.target.value.toLowerCase()) !== -1) ||
        (item.cos_cname.toLowerCase().search(
          event.target.value.toLowerCase()) !== -1)
      )
    })
    this.setState({items: updatedList});
    console.log("What've I done.");
  }

  //input press ENTER
  handleKeyPress = (e) => {
    if (e.key === 'Enter' && this.state.items[0] !== undefined) {
      let sid = this.state.items[0].student_id
    }
  }

  searchCallback = (item) => {
    if(item.cos_code !== undefined) this.props.parentFunction(item)
  }

  render () {
    return (
      <div style={styles.filter}>

        <div className="filter-list">
          <input type="text"
                 placeholder="搜尋 課程名稱/ 學期"
                 onChange={this.filterList}
                 onKeyPress={this.handleKeyPress}
          />
        </div>

        <MuiThemeProvider>
          <CourseTable items={this.props.items}
                       parentFunction={this.searchCallback}
          />
        </MuiThemeProvider>
      </div>
    )
  }

}
