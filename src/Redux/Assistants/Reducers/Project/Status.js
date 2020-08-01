import { handleActions } from 'redux-actions'

const initialState = {
  teachers: [ /*
    {
      "professor_name": "吳凱強",
      "professor_id": "T9003",
      "accept_status": 0,
      "pending_status": 0,
      "gradeCnt": 0,
      "accepted": {
        "projects": [
          {
            "title": "107-2尚未決定",
            "students": [
              {
                "id": "0516038",
                "name": "李元鈞",
                "program": null,
                "semester": "107-2",
                "first_second": "1",
                "status": "1",
                "add_status": "0",
                "score": null,
                "comment": null
              },
              {
                "id": "0516313",
                "name": "陳柏翰",
                "program": null,
                "semester": "107-2",
                "first_second": "1",
                "status": "1",
                "add_status": "1",
                "score": null,
                "comment": null
              },
              {
                "id": "0516332",
                "name": "吳偉俊",
                "program": null,
                "semester": "107-2",
                "first_second": "1",
                "status": "1",
                "add_status": "1",
                "score": null,
                "comment": null
              },
              {
                "id": "0516334",
                "name": "歐頌恆",
                "program": null,
                "semester": "107-2",
                "first_second": "1",
                "status": "1",
                "add_status": "0",
                "score": null,
                "comment": null
              }
            ]
          },
          {
            "title": "自動語音識別及其對抗攻擊之實作",
            "students": [
              {
                "id": "0516305",
                "name": "宋秉勳",
                "program": null,
                "semester": "107-1",
                "first_second": "1",
                "status": "1",
                "add_status": "1",
                "score": 50,
                "comment": "Hello"
              },
              {
                "id": "0516306",
                "name": "尤健羽",
                "program": null,
                "semester": "107-1",
                "first_second": "1",
                "status": "1",
                "add_status": "1",
                "score": 55,
                "comment": "Hello123"
              },
              {
                "id": "0516327",
                "name": "李昂軒",
                "program": null,
                "semester": "107-1",
                "first_second": "1",
                "status": "1",
                "add_status": "1",
                "score": null,
                "comment": null
              }
            ]
          },
          {
            "title": "近似計算用於人工智慧加速",
            "students": [
              {
                "id": "0416233",
                "name": "蕭裕衡",
                "program": null,
                "semester": "107-1",
                "first_second": "2",
                "status": "1",
                "add_status": "1",
                "score": null,
                "comment": null
              }
            ]
          },
          {
            "title": "嵌入式創意應用",
            "students": [
              {
                "id": "0416240",
                "name": "楊捷安",
                "program": null,
                "semester": "107-2",
                "first_second": "2",
                "status": "1",
                "add_status": "1",
                "score": null,
                "comment": null
              },
              {
                "id": "0416250",
                "name": "簡道勛",
                "program": null,
                "semester": "107-1",
                "first_second": "2",
                "status": "1",
                "add_status": "1",
                "score": null,
                "comment": null
              }
            ]
          },
          {
            "title": "AI運算平台",
            "students": [
              {
                "id": "0210186",
                "name": "朱宇融",
                "program": "電工系4",
                "semester": "106-2",
                "first_second": "2",
                "status": "0",
                "add_status": "1",
                "score": null,
                "comment": null
              }
            ]
          }
        ]
      },
      "pending": {
        "projects": []
      }
    }
  */],
  input: '',
  year: '',
  semester: '',
  first_second: '',
  csvArr: [],
  csvDone: true,
  templateDone: false,
  templateFile: '',
  people: [ /*
    {"id": "0616000", "name": "people1"},
    {"id": "0616001", "name": "people2"},
    {"id": "0616001", "name": "people2"}
  */],
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
