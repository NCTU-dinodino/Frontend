import React from 'react'
// mui
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DescriptionIcon from '@material-ui/icons/Description'
//import ListAltIcon from '@material-ui/icons/ListAlt';
import ApplyIcon from '@material-ui/icons/AssignmentTurnedIn'
// for ListItemText style
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
// components
import GroupList from './GroupList'
import GroupApply from './GroupApply'
import GroupChange from './GroupChange'
// css
import './style.css'
// REDUX
import { connect } from 'react-redux'

const styles = theme => ({
  listItemText:{
    fontSize:'1em',
    fontFamily: '微軟正黑體'//Insert your required size
  }
});
//const classes = useStyles();
class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      type: 0
    }
  }
  
  switchCase = (type) => {
    switch(type){
      case 0:
        return <GroupList idCard={this.props.idCard} handleGroupClick={this.handleGroupClick} />
      case 1:
        return <GroupApply idCard={this.props.idCard} handleGroupClick={this.handleGroupClick} />
      case 2:
        return <GroupChange idCard={this.props.idCard} handleGroupClick={this.handleGroupClick} />
    }
  }
  render () {
    const { type } = this.state

    // const classes = {
    //   listItemText:{
    //     fontSize:'1em'//Insert your required size
    //   }
    // }
    return (
      <div className='container'>
        <div className='row' style={{marginTop: 40}}>
          <div className='col-md-3'>
            <List>
              <ListItem button key={0} onClick={() => this.setState({type: 0})}
                style={type === 0 ? {background: '#e4e6f5'} : {}} >
                <ListItemIcon><DescriptionIcon color={type === 0 ? 'primary' : ''} /></ListItemIcon>
                <ListItemText classes={{ primary:this.props.classes.listItemText }} primary={'專題列表'} />
              </ListItem>
              <ListItem button key={1} onClick={() => this.setState({type: 1})}
                style={type === 1 ? {background: '#e4e6f5'} : {}} >
                <ListItemIcon><ApplyIcon color={type === 1 ? 'primary' : ''} /></ListItemIcon>
                <ListItemText classes={{ primary:this.props.classes.listItemText }} primary={'專題申請審核'} />
              </ListItem>
              <ListItem button key={1} onClick={() => this.setState({type: 2})}
                style={type === 2 ? {background: '#e4e6f5'} : {}} >
                <ListItemIcon><ApplyIcon color={type === 2 ? 'primary' : ''} /></ListItemIcon>
                <ListItemText classes={{ primary:this.props.classes.listItemText }} primary={'專題退選申請'} />
              </ListItem>
            </List>
          </div>
          <div className='col-md-9'>
            {this.switchCase(type)}
            {/*
              type === 0
              ? <GroupList idCard={this.props.idCard} handleGroupClick={this.handleGroupClick} />
              : <GroupApply idCard={this.props.idCard} handleGroupClick={this.handleGroupClick} />
            */}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  idCard: state.Teacher.User.idCard
})
const mapDispatchToProps = (dispatch) => ({
})


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Index))
