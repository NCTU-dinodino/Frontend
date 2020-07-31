
import { createActions } from 'redux-actions'
import axios from 'axios'
// import FakeData from '../../../../Resources/FakeData'
import { getYear } from '../../../../Utilities/'

const actions = createActions({
  PROFESSOR: {
    LIST: {
      STORE: null
    },
    MENTOR: {
      STORE: null
    },
    PAST_PROJECT: {
      STORE: null
    }
  }
})

export const getProfessors = () => dispatch => {
  axios.get('/students/professorInfo/list', { params: { year: getYear() } })
    .then(res => dispatch(actions.professor.list.store(res.data)))
    .catch(error => {
      console.log(error)
      // dispatch(actions.professor.list.store(FakeData.ProfessorList))
    })
}

export const getMentor = () => dispatch => {
  axios.get('/students/professorInfo/getMentor')
    .then(res => dispatch(actions.professor.mentor.store(res.data[0].tname)))
    .catch(error => {
      console.log(error)
      // dispatch(actions.professor.mentor.store('張立平'))
    })
}

export const getPastProjects = (payload) => dispatch => {
  axios.post('/students/professorInfo/pastResearch', payload)
    .then(res => dispatch(actions.professor.pastProject.store(res.data)))
    .catch(err => {
      console.log(err)
      // dispatch(actions.professor.pastProject.store(FakeData.ProfessorProject))
    })
}
