
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const styles = (theme) => ({
  label: {
    fontSize: '20px',
    [theme.breakpoints.down('md')]: {
      fontSize: '18px',
    },
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '200px'
  }
})

const NameFilter = (withStyles(styles)(({ classes, name, onChange }) => (
  <div className={classes.nameFilters}>
    <TextField
      label='搜尋教授姓名'
      margin='normal'
      className={classes.textField}
      InputLabelProps={{
        classes: {
          root: classes.label
        },
        shrink: true
      }}
      value={name}
      onChange={(event) => onChange({ name: event.target.value })}
    />
  </div>
)))

const ScountFilter = (withStyles(styles)(({ classes, scount, onChange }) => (
  <div>
    <TextField
      label='專題已收名額(以下)'
      margin='normal'
      type='number'
      className={classes.textField}
      InputLabelProps={{
        classes: {
          root: classes.label
        },
        shrink: true
      }}
      inputProps={{ max: 7, min: 0 }}
      value={scount}
      onChange={(event) => onChange({ scount: event.target.value })}
    />
  </div>
)))

export { NameFilter, ScountFilter }
