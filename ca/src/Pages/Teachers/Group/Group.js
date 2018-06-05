import React from 'react'

import GroupList from './GroupList'
import GroupApply from './GroupApply'
import GroupScore from './GroupScore'

// for tabs
import 'rc-tabs/assets/index.css'
import '../../../Components/ca-rc-tabs.css'
import Tabs, { TabPane } from 'rc-tabs'
import TabContent from 'rc-tabs/lib/SwipeableTabContent'
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Show from './Show'
import SwipeableViews from 'react-swipeable-views'

class Group extends React.Component {
  constructor (props) {
    super(props)
    this.handleChangeIndex = this.handleChangeIndex.bind(this)
    this.handleGroupClick = this.handleGroupClick.bind(this)
    this.state = {
      index: 0,
      item:
        { research_title: '資料錯誤',
          participants: [
            { student_id: '0399999',
              sname: '陳罐頭',
              detail: '資工系 網多組3 '
            }
          ],
          year: '106'
        },
      activeKey: '3',
      start: 0
    }
  }
  handleChangeIndex (index) {
    this.setState({
      index
    })
  }
  handleGroupClick (item) {
    this.setState({
      item: item,
      index: 1
    })
  }
  onChange = (activeKey) => {
    this.setState({
      activeKey,
    });
  };
  render () {
    return (
      <SwipeableViews index={this.state.index} onChangeIndex={this.handleChangeIndex} >
      <div>
        <Tabs
          renderTabBar={() => <ScrollableInkTabBar onTabClick={this.onTabClick} />}
          renderTabContent={() => <TabContent />}
          activeKey={this.state.activeKey}
          onChange={this.onChange}
        >
          <TabPane tab={`專題申請`} key='1'>
            <GroupApply idCard={this.props.idCard} />
          </TabPane>
          <TabPane tab={`專題列表`} key='2'>
            <GroupList idCard={this.props.idCard} handleGroupClick={this.handleGroupClick}/>
          </TabPane>
          <TabPane tab={`專題評分`} key='3'>
            <GroupScore idCard={this.props.idCard} />
          </TabPane>
        </Tabs>
      </div>
      <div>
      <MuiThemeProvider>
          <Show onclick={this.handleChangeIndex} show={this.state.item} />
      </MuiThemeProvider>
      </div>
      </SwipeableViews>
    )
  }
}
export default Group
