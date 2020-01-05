import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import TextField from '@material-ui/core/TextField'

import { setScores } from '../../../../Redux/Assistants/Actions/Project/Score'


const styles = theme => ({
  container: {
    width: '100%',
    margin: '0 auto',
    position: 'relative',
    marginBottom: '50px'
  },
  warningText: {
    fontSize: '30px',
    flex: 1,
    textAlign: 'center',
    color: '#6f6f6f'
  },
  warningTextSmall: {
    fontSize: '20px',
    flex: 1,
    textAlign: 'center',
    color: '#6f6f6f'
  },

})

class Score extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open_edit: -1,
      new_score: 0,
      new_comment: "無評論"
    }
  }

  warningText = (text, css) => {
    return (
      <div style = {{ display: 'flex', width: '100%' }}>
        <div style = {{ flex: 0.1 }}/>
        <div className={css}>
          {text}
        </div>
        <div style = {{ flex: 0.1 }} />
      </div>
    )
  }

  hightlight = (label, raw_input) => {
    if (raw_input === '')
      return label
    const target = new RegExp(raw_input,"gi");
    var result, indices = [];
    while ( (result = target.exec(label)) ) {
        indices.push(result.index);
    }
    indices.push(label.length)
    return indices.length ? (
      <span>
        <span>{label.substr(0, indices[0])}</span>
        {
          indices.map( (index, idx) =>
            <span key={idx}>
              <span style={{background: 'yellow'}}>{label.substr(index, raw_input.length)}</span>
              <span>{idx === indices.length - 1 ? '' : label.substr(index + raw_input.length, indices[idx + 1] - index - raw_input.length)}</span>
            </span>
          )
        }
      </span>
    ) : label
  }

  input_filter = (scores, target) => {
    return scores.filter( score => {
      return (
        target === '' || 
        score.student.id.search(target) !== -1 ||
        score.student.name.search(target) !== -1 ||
        score.professor_name.search(target) !== -1 ||
        score.student.comment.search(target) !== -1
      )
    })
  }

  render () {
    const { classes, Score, set_scores } = this.props
    const { year, semester, first_second } = Score
    const { open_edit, new_score, new_comment } = this.state

    return (
      Score.year === '' ? (
        this.warningText("請選取學年", classes.warningText)
      ) : Score.semester === '' ? (
        this.warningText("請選取學期", classes.warningText)
      ) : Score.first_second === '' ? (
        this.warningText("請選取專題", classes.warningText)
      ) : (
        <div className={classes.container}>
        {
          this.input_filter(Score.scores, Score.input).length ?
            this.input_filter(Score.scores, Score.input).map((score, index) => {
              return (
                <div style={{ margin: '5px auto', fontFamily: 'Noto Sans CJK TC' }} key = {index} >
                  <ExpansionPanel expanded={true} >
                    <ExpansionPanelSummary>
                      <div style={{ width: '100%', display: 'flex' }}>
                        <div style={{ fontSize: 20, flex: 0.2, textAlign: 'center', color: 'black' }} >{ this.hightlight(score.student.id, Score.input) }</div>
                        <div style={{ fontSize: 20, flex: 0.3, textAlign: 'center', color: 'black' }} >{ this.hightlight(score.student.name, Score.input) }</div>
                        <div style={{ fontSize: 20, flex: 0.3, textAlign: 'center', color: 'black' }} >{ this.hightlight(score.professor_name, Score.input) }</div>
                        <div style={{ fontSize: 20, flex: 0.2, textAlign: 'center', color: 'black' }} >{ score.student.score ? score.student.score : '尚未評分' }</div>
                        <div>
                          <Button variant="outlined" className={classes.button} onClick = { () => this.setState({
                            open_edit: index,
                            new_score: score.student.score ? score.student.score : 0,
                            new_comment: score.student.comment ? score.student.comment : '無評論'
                          }) } >
                            助理端評分
                          </Button>
                        </div>
                        <Dialog onClose = { () => this.setState({ open_edit: false })} open = { open_edit === index } >
                          <DialogTitle><div style = {{ fontSize: '25px' }} >助理端評分</div></DialogTitle>
                          <h4 style = {{ paddingLeft: '30px' }}>{score.student.id + " " + score.student.name}</h4>
                          <div style = {{ display: 'flex', paddingLeft: '20px', paddingRight: '20px' }}>
                            <TextField
                              label='分數'
                              type='number'
                              value={ new_score }
                              onChange={ (event) => this.setState({ new_score: event.target.value })}
                              margin='normal'
                              className={classes.textField}
                              InputLabelProps={{
                                classes: {
                                  root: classes.label
                                },
                                shrink: true
                              }}
                            />
                            <TextField
                              label='評論'
                              margin='normal'
                              value={ new_comment }
                              className={classes.textField2}
                              onChange={ (event) => this.setState({ new_comment: event.target.value })}
                              InputLabelProps={{
                                classes: {
                                  root: classes.label
                                },
                                shrink: true
                              }}
                            />
                          </div>
                          <br />
                          <div style = {{ display: 'flex' }}>
                            <div style = {{ flex: 1 }} />
                            <Button className={classes.button} onClick={ () => this.setState({ open_edit: -1 }) } >取消</Button>
                            <Button color="primary" className={classes.button} onClick = { () => {
                              set_scores({
                                student_id: score.student.id,
                                tname: score.professor_name,
                                research_title: score.student.research_title,
                                first_second: first_second,
                                semester: year + '-' + semester,
                                new_score: new_score,
                                new_comment: new_comment
                              })
                              this.setState({ open_edit: -1 })
                            }}>
                              送出！
                            </Button>
                          </div>
                        </Dialog>
                      </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      {
                        score.student.comment
                          ? <div style={{ width: '100%', display: 'flex' }} >
                            <div style={{ fontSize: 17, flex: 1, textAlign: 'center' }} variant='display1' >{this.hightlight(score.student.comment, Score.input)}</div>
                          </div>
                          : <div style={{ width: '100%', display: 'flex' }} >
                            <div style={{ fontSize: 17, flex: 1, textAlign: 'center' }} variant='display1' >無評論</div>
                          </div>
                      }
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </div>
              )
            }) : this.warningText("找不到符合的資料，點此可以清掉所有搜尋條件", classes.warningText)
        }
        </div>
      )
    )
  }
}

const mapStateToProps = (state) => ({
  Score: state.Assistant.Project.Score,

})

const mapDispatchToProps = (dispatch) => ({
  set_scores: (payload) => dispatch(setScores(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Score))