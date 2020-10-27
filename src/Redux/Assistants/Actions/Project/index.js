import { createAction } from 'redux-actions'
import axios from 'axios'

export const projectHandleChange = createAction('PROJECT_HANDLE_CHANGE');

const calStudentLevel = (student) => {
  return {
    ...student,
    level:
      student.cpe_status === "2" ? "0" : 
      student.cpe_status === "0" ? "1" :
      student.is_pending === "1" ? "2" :
      student.add_status === "0" ? "3" :
      student.score === null ? "4" : "5"
  }
}

const calProjectLevel = (project) => {
  return { ...project,
    students: project.students.map(
      student => ({ ...student,
        is_pending: project.is_pending
      })
    ).map( student => calStudentLevel(student) ),
    level: project.students.map(
      student => ({ ...student,
        is_pending: project.is_pending
      })
    ).reduce( (level, student) => Math.min(level, calStudentLevel(student).level), 5)
  }
}

export const fetchData = (payload) => dispatch => {
  dispatch(projectHandleChange({fetching: true}))
  axios.post('/assistants/research/professorList', payload).then( res => {
    dispatch(projectHandleChange({
      rawData: res.data.map( teacher => ({ ...teacher,
        accepted: { ...teacher.accepted,
          projects: teacher.accepted.projects.map( project => ({
            ...project,
            is_pending: false,
          })).map( project => calProjectLevel(project))
        },
        pending: { ...teacher.pending,
          projects: teacher.pending.projects.map( project => ({
            ...project,
            is_pending: true,
          })).map( project => calProjectLevel(project))
        },
      }))
    }))
  }).catch( err => {
    window.alert("獲取專題資料失敗!");
    console.log(err);
  });
  dispatch(projectHandleChange({fetching: false}))
}