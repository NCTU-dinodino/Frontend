
import { createActions } from 'redux-actions'
import axios from 'axios'
import store from '../../../../App'
import { FETCHING_STATUS } from '../../../../Utils/constant'
// import FakeData from '../../../../Resources/FakeData'

const actions = createActions({
  PROJECT: {
    LIST: {
      STORE: null
    },
    NEW: {
      STORE: null,
      SET_STATUS: null
    },
    DELETE: {
      SET_STATUS: null
    },
    TIMES: {
      SET_STATUS: null
    }
  }
})

export const getProjects = () => dispatch => {
  axios.get('/students/research/list')
    .then(res => dispatch(actions.project.list.store(res.data)))
    .catch(error => {
      console.log(error)
      // dispatch(actions.project.list.store(FakeData.Project))
    })
}

export const newProject = (payload) => dispatch => {
  dispatch(actions.project.times.setStatus(FETCHING_STATUS.FETCHING))
  axios.get('/getTimes')
    .then(res => {
      var begin = res.data["project"].begin, end = res.data["project"].end, today = new Date()
      var date = today.getFullYear() + '-'
                + ('0' + (today.getMonth()+1)).slice(-2) + '-'
                + ('0' + today.getDate()).slice(-2) + 'T'
                + ('0' + today.getHours()).slice(-2) + ':'
                + ('0' + today.getMinutes()).slice(-2)

      if (begin > date || end < date ) {
        dispatch(actions.project.times.setStatus(FETCHING_STATUS.ERROR))
        dispatch(actions.project.new.setStatus(FETCHING_STATUS.ERROR))
      }
      else {
        dispatch(actions.project.times.setStatus(FETCHING_STATUS.DONE))

        dispatch(actions.project.new.setStatus(FETCHING_STATUS.FETCHING))
        axios.post('/students/research/showStudentStatus', { members: payload.members })
          .then(res => {
            dispatch(actions.project.new.store(res.data))
            const qualified = res.data.every((student) => (student.status === 1 || student.status === 2))

            if (qualified) {
              axios.post('/students/research/create', payload)
                .then(res => dispatch(actions.project.new.setStatus(FETCHING_STATUS.DONE)))
                .catch(err => {
                  console.log(err)
                  // dispatch(actions.project.new.store([{ student_id: '0516000', status: 3 }, { student_id: '0616000', status: 4 }]))
                  dispatch(actions.project.new.setStatus(FETCHING_STATUS.ERROR))
                })
            } else {
              dispatch(actions.project.new.setStatus(FETCHING_STATUS.ERROR))
            }
          })
          .catch(error => {
            console.log(error)
            dispatch(actions.project.new.setStatus(FETCHING_STATUS.ERROR))
          })
      }
    })
    .catch(error => {
      console.log(error)
      dispatch(actions.project.times.setStatus(FETCHING_STATUS.ERROR))
      dispatch(actions.project.new.setStatus(FETCHING_STATUS.ERROR))
    })
}

export const newProjectReset = () => dispatch => {
  dispatch(actions.project.new.store([]))
  dispatch(actions.project.new.setStatus(FETCHING_STATUS.IDLE))
}

export const deleteProject = (payload) => dispatch => {
  dispatch(actions.project.delete.setStatus(FETCHING_STATUS.FETCHING))
  axios.post('/students/research/delete', payload)
    .then(res => dispatch(actions.project.delete.setStatus(FETCHING_STATUS.DONE)))
    .catch(err => {
      console.log(err)
      dispatch(actions.project.delete.setStatus(FETCHING_STATUS.ERROR))
    })
}

export const deleteProjectReset = () => dispatch => {
  dispatch(actions.project.delete.setStatus(FETCHING_STATUS.IDLE))
}

// export const getTimes = () => dispatch => {
//   dispatch(actions.project.times.setStatus(FETCHING_STATUS.FETCHING))
//   axios.get('/getTimes')
//     .then(res => {
//       var begin = res.data["project"].begin, end = res.data["project"].end, today = new Date()
//       var date = today.getFullYear() + '-'
//                 + ('0' + (today.getMonth()+1)).slice(-2) + '-'
//                 + ('0' + today.getDate()).slice(-2) + 'T'
//                 + ('0' + today.getHours()).slice(-2) + ':'
//                 + ('0' + today.getMinutes()).slice(-2)

//       if (begin > date || end < date )
//         dispatch(actions.project.times.setStatus(FETCHING_STATUS.ERROR))
//       else 
//         dispatch(actions.project.times.setStatus(FETCHING_STATUS.DONE))
//     })
//     .catch(error => {
//       console.log(error)
//       dispatch(actions.project.times.setStatus(FETCHING_STATUS.ERROR))
//     })
// }