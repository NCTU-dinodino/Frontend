
import { createActions } from 'redux-actions'
import axios from 'axios'
import FakeData from '../../../../Resources/FakeData'

export const actions = createActions({
  GRADUATION: {
    DETAIL: {
      STORE: null
    },
    ENGLISH: {
      STORE: null
    },
    GET_REVIEW: {
      STORE: null
    },
    SEND_REVIEW: {
      STORE: null
    },
    MOVE_COURSE: {
      STORE: null,
      SET_SUCCESS: null
    },
    RESET_COURSE: {
      SET_SUCCESS: null
    },
    ASSISTANT: {
      STORE: null
    }
  }
})

const getCourseDetail = (payload) => dispatch => {
  axios
    .post('/students/graduate/detail', payload)
    .then(res =>  dispatch(actions.graduation.detail.store(res.data)))
    .catch(err => {
      dispatch(actions.graduation.detail.store(FakeData.GraduationDetails_empty)) // for error display
      // dispatch(actions.graduation.detail.store(FakeData.GraduationDetails)) // for dev test
      console.log(err)
  })
}

export const getGraduationInfo = (payload = null) => dispatch => {
  axios
    .get('/students/graduate/check')
    .then(res => {
      let newPayload
      // 已經送審或是沒有特別選組別，就用api抓到的組別
      if (res.data.status !== 0 || payload === null) {
        newPayload = { professional_field: res.data.professional_field }
      } else {
        newPayload = { ...payload }
      }
      dispatch(getCourseDetail(newPayload))
      dispatch(actions.graduation.getReview.store({ ...res.data, ...newPayload }))
    })
    .catch(err => {
      dispatch(getCourseDetail(payload))
      console.log(err)
    })

  axios
    .get('/students/graduate/english')
    .then(res =>  dispatch(actions.graduation.english.store(res.data.status)))
    .catch(err =>  console.log(err))
}

export const getGraduationInfoAssistantVersion = (id, sname, program, field) => dispatch => {
  axios
    .get('/assistants/graduate/detail', {
      params: {
        student_id: id,
        professional_field: field
      }
    })
    .then(res => dispatch(actions.graduation.detail.store(res.data)))
    .catch(err => {
      dispatch(actions.graduation.detail.store(FakeData.GraduationDetails_empty))
      console.log(err)
    })

  axios
    .get('/assistants/graduate/check', {
      params: {
        student_id: id
      }
    })
    .then(res => dispatch(actions.graduation.getReview.store({ ...res.data, professional_field: field })))
    .catch(err => console.log(err))

  axios
    .get('/assistants/graduate/english', {
      params: {
        student_id: id
      }
    })
    .then(res => dispatch(actions.graduation.english.store(res.data.status)))
    .catch(err => console.log(err))

  dispatch(actions.graduation.assistant.store({ id, sname, program }))
}

export const reviewSubmit = (payload) => dispatch => {
  axios
    .post('/students/graduate/check', payload)
    .then(res => dispatch(actions.graduation.sendReview.store(res.data)))
    .catch(err => console.log(err))
}

export const getMoveTargets = (payload) => dispatch => {
  axios
    .post('/students/graduate/legalMoveTarget', payload)
    .then(res => dispatch(actions.graduation.moveCourse.store(res.data.targets)))
    .catch(err => console.log(err))
}

export const moveCourse = (payload) => dispatch => {
  axios
    .post('/students/graduate/moveCourse', payload)
    .then(res => dispatch(actions.graduation.moveCourse.setSuccess(true)))
    .catch(err => console.log(err))
}

export const resetCourse = (payload) => dispatch => {
  axios
    .post('/students/graduate/resetMove', payload)
    .then(res => dispatch(actions.graduation.resetCourse.setSuccess(true)))
    .catch(err => console.log(err))
}
