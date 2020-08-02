
import { createActions } from 'redux-actions'
import axios from 'axios'
import { FETCHING_STATUS } from '../../Utils/constant'
// import FakeData from '../../Resources/FakeData'

export const actions = createActions({
  BULLETINS: {
    INDEX: {
      STORE: null,
      SET_STATUS: null
    },
    NEW: {
      SET_STATUS: null
    },
    EDIT: {
      SET_STATUS: null
    },
    DELETE: {
      SET_STATUS: null
    }
  }
})

export const getBulletins = () => dispatch => {
  dispatch(actions.bulletins.index.setStatus(FETCHING_STATUS.FETCHING))
  axios
    .get('/bulletin')
    .then(({ data: bulletins }) => {
      dispatch(actions.bulletins.index.store(bulletins))
      dispatch(actions.bulletins.index.setStatus(FETCHING_STATUS.DONE))
    })
    .catch(() => {
      // dispatch(actions.bulletins.index.store(FakeData.Bulletins))
      dispatch(actions.bulletins.index.setStatus(FETCHING_STATUS.FAIL))
    })
}

export const newBulletin = (payload) => dispatch => {
  dispatch(actions.bulletins.new.setStatus(FETCHING_STATUS.FETCHING))
  axios
    .post('/bulletin', payload)
    .then(() => dispatch(actions.bulletins.new.setStatus(FETCHING_STATUS.DONE)))
    .catch(() => dispatch(actions.bulletins.new.setStatus(FETCHING_STATUS.FAIL)))
}

export const editBulletin = (payload) => dispatch => {
  dispatch(actions.bulletins.edit.setStatus(FETCHING_STATUS.FETCHING))
  axios
    .post('/bulletin/edit', payload)
    .then(() => dispatch(actions.bulletins.edit.setStatus(FETCHING_STATUS.DONE)))
    .catch(() => dispatch(actions.bulletins.edit.setStatus(FETCHING_STATUS.FAIL)))
}

export const deleteBulletin = (payload) => dispatch => {
  dispatch(actions.bulletins.delete.setStatus(FETCHING_STATUS.FETCHING))
  axios
    .post('/bulletin/delete', payload)
    .then(() => dispatch(actions.bulletins.delete.setStatus(FETCHING_STATUS.DONE)))
    .catch(() => dispatch(actions.bulletins.delete.setStatus(FETCHING_STATUS.FAIL)))
}

export const newBulletinReset = () => dispatch => {
  dispatch(actions.bulletins.new.setStatus(FETCHING_STATUS.IDLE))
}

export const editBulletinReset = () => dispatch => {
  dispatch(actions.bulletins.edit.setStatus(FETCHING_STATUS.IDLE))
}

export const deleteBulletinReset = () => dispatch => {
  dispatch(actions.bulletins.delete.setStatus(FETCHING_STATUS.IDLE))
}
