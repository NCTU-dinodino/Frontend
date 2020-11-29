import { createAction } from 'redux-actions'
import axios from 'axios'

export const projectHandleChange = createAction('PROJECT_HANDLE_CHANGE');

const calStudentProgress = (student) => {
  return {
    ...student,
    progress:
      student.cpe_status === "2" ? "FAIL_CPE" :
      student.cpe_status === "0" ? "PENDING_CPE" :
      student.is_pending === "1" ? "PENDING_TEACHER" :
      student.add_status === "0" ? "WAITING_ADD_COURSE" :
      student.score === null ? "PENDING_SCORE" : "ACCEPTED"
  }
}

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
        is_pending: project.is_pending,
        professor_name: project.professor_name,
        professor_id: project.professor_id,
        research_title: project.title,
        type: project.is_pending === "1" ? "0" : "1"
      })
    ).map( student => calStudentLevel(student) )
  }
}

export const fetchNotInSystemData = (payload) => dispatch => {
  axios.post('/assistants/research/professorList', payload).then( res => {
    dispatch(projectHandleChange({
      select: [],
      noInSystem: res.data
    }))
  }).catch( err => {
    window.alert("獲取未申請dino名單資料失敗!");
  })
}


const res = []

export const fetchData = (payload) => dispatch => {
  dispatch(projectHandleChange({fetching: true}))
  axios.post('/assistants/research/professorList', payload).then( res => {
    dispatch(projectHandleChange({
      select: [],
      rawData: res.data.map( teacher => ({ ...teacher,
        gradeCnt: teacher.accepted.projects.reduce( (sum, project) => {
          return sum + project.students.filter( student => student.status === "1" ).length
        }, 0),
        accepted: { ...teacher.accepted,
          projects: teacher.accepted.projects.map( project => ({
            ...project,
            is_pending: "0",
            professor_name: teacher.professor_name,
            professor_id: teacher.professor_id
          })).map( project => calProjectLevel(project))
        },
        pending: { ...teacher.pending,
          projects: teacher.pending.projects.map( project => ({
            ...project,
            is_pending: "1",
            professor_name: teacher.professor_name,
            professor_id: teacher.professor_id
          })).map( project => calProjectLevel(project))
        },
      }))
    }))
    dispatch(fetchNotInSystemData({
      semester: payload.year + '-' + payload.semester,
      first_second: payload.first_second
    }))
    dispatch(projectHandleChange({fetching: false}))
  }).catch( err => {
    window.alert("獲取專題資料失敗!");
    console.log(err);
    dispatch(projectHandleChange({
      select: [],
      rawData: res.map( teacher => ({ ...teacher,
        gradeCnt: teacher.accepted.projects.reduce( (sum, project) => {
          return sum + project.students.filter( student => student.status === "1" ).length
        }, 0),
        accepted: { ...teacher.accepted,
          projects: teacher.accepted.projects.map( project => ({
            ...project,
            is_pending: "0",
            professor_name: teacher.professor_name,
            professor_id: teacher.professor_id
          })).map( project => calProjectLevel(project))
        },
        pending: { ...teacher.pending,
          projects: teacher.pending.projects.map( project => ({
            ...project,
            is_pending: "1",
            professor_name: teacher.professor_name,
            professor_id: teacher.professor_id
          })).map( project => calProjectLevel(project))
        },
      }))
    }))
    dispatch(projectHandleChange({fetching: false}))
  });
}

export const sendWarningMail = (payload) => dispatch => {
  if (window.confirm('即將發送給' + payload.people.length + '人')) {
    axios.post('/sendMail', {
      "subject": payload.mail.subject,
      "content": payload.mail.content,
      "bcc": payload.people.map( person => person.id ),
      "to": [],
      "cc": []
    }).then( res => {
      window.alert("寄信成功!")
    }).catch( err => {
      window.alert("寄信失敗, 請連繫dino團隊!")
      console.log(err)
    })
  }
}

export const setCPEStatus = (payload) => dispatch => {
  Promise.all(payload.people.map( person =>
    axios.post('/assistants/research/setCPEStatus', person).then( res => {
    }).catch( err => {
      window.alert("更改" + person.student_id + "CPE狀態失敗, 請連繫dino團隊!")
      console.log(err)
      throw err
    })
  )).then( res => {
    window.alert("更改 " + payload.people.length + " 人CPE狀態成功!")
    dispatch(fetchData(payload.refresh))
  }).catch( err => {
    console.log(err);
  })
}

export const fetchCsv = (payload) => dispatch => {
  dispatch(projectHandleChange({csvDone: false}))
  axios.post('/assistants/research/professorListDownload', payload).then(res => {
    let data = res.data, csvArr = []
    csvArr.push(['學生學號', '學生姓名', '指導教授', '學期', '專題題目', '專題課名', '組別ID'])
    for (let i = 0; i < data.length; i++) {
      csvArr.push([data[i].student_id, data[i].sname, data[i].tname, data[i].semester, data[i].research_title, data[i].cos_cname, data[i].team_idx])
    }
    dispatch(projectHandleChange({csvArr: csvArr, csvDone: true}))
  })
}

export const uploadXLSX = (payload) => dispatch => {
  axios.post('/dataUpload', payload.upload).then( res => {
    window.alert("檔案上傳至伺服器成功, 正在處理資料...")
    dispatch(fetchData(payload.refresh))
  }).catch( err => {
    window.alert("檔案上傳至伺服器失敗, 請檢查連線是否有問題, 或是通知dinodino開發團隊!");
    console.log(err)
  })
}

export const fetchXLSX = (payload) => dispatch => {
  dispatch(projectHandleChange({templateDone: false}))
  axios.post('/dataFormDownload', payload).then ( res => {
    dispatch(projectHandleChange({templateFile: res.data, templateDone: true}))
  })
}

export const withdrawStudents = (payload) => dispatch => {
  let ok = true;
  Promise.all(payload.people.map( person =>
    axios.post('/assistants/research/delete', person).then( res => {
    }).catch( err => {
      ok = false;
      window.alert("退申請單" + person.student_id + "失敗, 請連繫dino團隊!")
      console.log(err)
    })
  )).then( res => {
    if (ok)
      window.alert("退申請單操作成功!")
    dispatch(fetchData(payload.refresh))
  })
}