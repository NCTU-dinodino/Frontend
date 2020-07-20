
import React from 'react'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import { NameFilter, ScountFilter } from './Filter'
import ProfessorCard from './ProfessorCard'

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      filter: {
        name: '',
        scount: 7
      }
    }
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.getFilteredProfessors = this.getFilteredProfessors.bind(this)
  }

  handleFilterChange (kv) {
    this.setState({ filter: { ...this.state.filter, ...kv } })
  }

  getFilteredProfessors (data, mentor, filter) {
    if (data.length === 0) return []
  
    let _data = [...data]
  
    // filter
    _data = _data.filter(t => (t.scount <= filter.scount))
    _data = _data.filter(t => (t.tname.search(filter.name) !== -1))
  
    // search mentor
    let index = _data.findIndex(t => (t.tname === mentor))
    if (index === -1) return _data
  
    // swap mentor to first element
    let object = { ..._data[index] }
    _data[index] = { ..._data[0] }
    _data[0] = { ...object }
  
    return _data
  }

  render () {
    const { data, mentor } = this.props.professors
    const { filter } = this.state
    const professors = this.getFilteredProfessors(data, mentor, filter)

    return (
      <Grid container item xs={12}>
        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <NameFilter name={filter.name} onChange={this.handleFilterChange} />
        </Grid>
        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <ScountFilter scount={filter.scount} onChange={this.handleFilterChange} />
        </Grid>
        <Grid item xs={12}>
          {
            professors.map((professor, index) => (
              <ProfessorCard data={professor} key={index} />
            ))
          }
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  professors: state.Student.Professor
})
const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
