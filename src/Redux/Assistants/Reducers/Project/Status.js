import { handleActions } from 'redux-actions'

const initialState = {
  teachers: [],
  input: '',
  year: '',
  semester: '',
  first_second: '',
  csvArr: [],
  csvDone: true,
  templateDone: false,
  templateFile: '',
  people: [],
  loading: true
}

export default handleActions({
  PROJECT_STATUS_HANDLE_CHANGE: (state, action) => ({ 
    ...state,
    ...action.payload
  }),
  PROJECT_STATUS_SET_SCORE: (state, action) => ({
    ...state,
    teachers: state.teachers.map(
      teacher => teacher.professor_name !== action.payload.tname ? teacher : { ...teacher,
        accepted: { ...teacher.accepted,
          projects: teacher.accepted.projects.map(
            project => project.title !== action.payload.research_title ? project : { ...project,
              students: project.students.map(
                student => student.id !== action.payload.student_id ? student : { ...student,
                  score: action.payload.new_score,
                  comment: action.payload.new_comment
                }
              )
            }
          )
        }
      }  
    )
  }),
  PROJECT_STATUS_GET_UNSCORE_TEACHER_LIST: (state, action) => ({
    ...state,
    people: state.teachers.filter( teacher => 
      teacher.accepted.projects.reduce( 
        (project_acc, project) => 
          project_acc |= project.students.reduce( 
            (student_acc, student) =>
              student_acc |= (student.score === null)
          , false)
      , false)
    ).map( teacher => { 
      return { 
        id: teacher.professor_id, 
        name: teacher.professor_name
      }
    })
  })
}, {
  ...initialState,
  teachers: initialState.teachers.map( teacher => {
    return {
      ...teacher,
      gradeCnt: teacher.accepted.projects.reduce( (sum, project) => {
        return sum + project.students.filter( student => student.status === "1" ).length
      }, 0)
    }
  })
})
