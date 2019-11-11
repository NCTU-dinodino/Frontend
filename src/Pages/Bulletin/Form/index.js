
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button
} from '@material-ui/core'

const styles = theme => ({
  title: {
    fontSize: '24px',
    fontWeight: 'bolder'
  },
  textField: {
    width: '100%'
  },
  label: {
    fontSize: '18px'
  },
  input: {
    fontSize: '20px'
  },
  menuItem: {
    fontSize: '18px'
  }
})

const Form = ({ open, title, payload, error, updatePayload, onSubmit, onClose, classes }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle classes={{ root: classes.title }} disableTypography={true}>
      {title}
    </DialogTitle>
    <DialogContent>
      <div>
        <TextField
          select
          label='公告類別'
          margin='normal'
          className={classes.textField}
          InputLabelProps={{
            classes: {
              root: classes.label
            }
          }}
          InputProps={{
            classes: {
              root: classes.input
            }
          }}
          value={payload.type}
          onChange={(e) => updatePayload({ type: e.target.value })}
          error={error && payload.type === -1}
        >
          <MenuItem value={-1} classes={{ root: classes.menuItem }}>請選擇公告類別</MenuItem>
          <MenuItem value={0} classes={{ root: classes.menuItem }}>公告訊息</MenuItem>
          <MenuItem value={1} classes={{ root: classes.menuItem }}>網站更新</MenuItem>
        </TextField>
      </div>
      <div>
        <TextField
          label='公告內容'
          margin='normal'
          fullWidth
          className={classes.textField}
          InputLabelProps={{
            classes: {
              root: classes.label
            }
          }}
          InputProps={{
            classes: {
              root: classes.input
            }
          }}
          multiline
          value={payload.content}
          onChange={(e) => updatePayload({ content: e.target.value })}
          error={error && payload.content === ''}
        />
        <TextField
          label='公告連結'
          margin='normal'
          fullWidth
          className={classes.textField}
          InputLabelProps={{
            classes: {
              root: classes.label
            }
          }}
          InputProps={{
            classes: {
              root: classes.input
            }
          }}
          value={payload.link}
          onChange={(e) => updatePayload({ link: e.target.value })}
        />
      </div>
    </DialogContent>
    <DialogActions>
      <Button color='primary' onClick={onSubmit}>送出</Button>
      <Button color='primary' onClick={onClose}>取消</Button>
    </DialogActions>
  </Dialog>
)

export default withStyles(styles)(Form)
