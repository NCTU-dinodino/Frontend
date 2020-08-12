import { createAction } from 'redux-actions'
import axios from 'axios'

// export const store_teachers = createAction('STORE_TEACHERS')
// export const update_add_status = createAction('UPDATE_ADD_STATUS')
// export const update_first_second = createAction('UPDATE_FIRST_SECOND')
// export const delete_research = createAction('DELETE_RESEARCH')
// export const storeScoreCsvData = createAction('STORE_SCORE_CSV_DATA')
// export const storeScoreCsvDataStart = createAction('STORE_SCORE_CSV_DATA_START')


// export const fetchTeachers = (post_item) => dispatch => {
//   axios.post('/assistants/research/professorList', post_item).then(res => {
//     dispatch(store_teachers(res.data))
//   }).catch(err => {
//     console.log(err)
//   })
// }

export const status_handle_change = createAction('PROJECT_STATUS_HANDLE_CHANGE');
export const set_score = createAction('PROJECT_STATUS_SET_SCORE')
export const get_unscore_teacher_list = createAction('PROJECT_STATUS_GET_UNSCORE_TEACHER_LIST')
export const get_pending_teacher_list = createAction('PROJECT_STATUS_GET_PENDING_TEACHER_LIST')

export const statusHandleChange = (payload) => dispatch => {
  dispatch(status_handle_change(payload));
}

export const fetchStatus = (payload) => dispatch => {
  dispatch(status_handle_change({ loading: true }))
  axios.post('/assistants/research/professorList', payload).then(res => {
    dispatch(status_handle_change({
      teachers: res.data.map( teacher => ({
          ...teacher,
          gradeCnt: teacher.accepted.projects.reduce( (sum, project) => {
            return sum + project.students.filter( student => student.status === "1" ).length
          }, 0)
      }))
    }))
    dispatch(status_handle_change({ loading: false }))
  }).catch(err => {
    window.alert('獲取專題列表失敗')
    console.log(err)
  })
}

export const fetchCsv = (payload) => dispatch => {
  dispatch(status_handle_change({csvDone: false}))
  axios.post('/assistants/research/professorListDownload', payload).then(res => {
    let data = res.data, csvArr = []
    csvArr.push(['學生學號', '學生姓名', '指導教授', '專題名稱', '專題級數'])
    for (let i = 0; i < data.length; i++) {
      if (payload.first_second === '1') {
        if (data[i].first_second === '1' || data[i].first_second === '3')
          csvArr.push([data[i].student_id, data[i].sname, data[i].tname, data[i].research_title, data[i].first_second])
      }
      if (payload.first_second === '2') {
        if (data[i].first_second === '2')
          csvArr.push([data[i].student_id, data[i].sname, data[i].tname, data[i].research_title, data[i].first_second])
      }
    }
    dispatch(status_handle_change({csvArr: csvArr, csvDone: true}))
  })
}

export const uploadXLSX = (payload) => dispatch => {
  axios.post('/dataUpload', payload.upload).then( res => {
    window.alert("檔案上傳至伺服器成功, 正在處理資料...")
    dispatch(fetchStatus(payload.refresh))
  }).catch( err => {
    window.alert("檔案上傳至伺服器失敗, 請檢查連線是否有問題, 或是通知dinodino開發團隊!");
    console.log(err)
  })
}

export const fetchXLSX = (payload) => dispatch => {
  dispatch(status_handle_change({templateDone: false}))
  axios.post('/dataFormDownload', payload).then ( res => {
    dispatch(status_handle_change({templateFile: res.data, templateDone: true}))
  })
}

export const setScore = payload => dispatch => {
  axios.post('/assistants/research/setScore', payload).then( res => {
    dispatch(set_score(payload))
    window.alert("評分成功!")
  }).catch( err => {
    window.alert("評分失敗, 請連繫dino團隊!")
    console.log(err)
  })
}

export const getUnScoreList = () => dispatch => {
  dispatch(status_handle_change({ loadingModal: true }))
  dispatch(get_unscore_teacher_list())
  dispatch(status_handle_change({ loadingModal: false }))
}

export const getNotOnCosList = (payload) => dispatch => {
  dispatch(status_handle_change({ loadingModal: true }))
  axios.post('/assistants/research/notOnCosList', payload).then( res => {
    dispatch(status_handle_change({people: res.data, loadingModal: false}))
  }).catch( err => {
    window.alert("獲取未選課列表失敗, 請連繫dino團隊!")
    console.log(err)
  })
}

export const getNotInSystemList = (payload) => dispatch => {
  dispatch(status_handle_change({ loadingModal: true }))
  axios.post('/assistants/research/notInSystemList', payload).then( res => {
    dispatch(status_handle_change({people: res.data, loadingModal: false}))
  }).catch( err => {
    window.alert("獲取未至dino申請列表失敗, 請連繫dino團隊!")
    console.log(err)
  })
}

export const sendWarningMail = (payload) => dispatch => {
  axios.post('/assistants/research/SendWarningEmail', payload).then( res => {
    window.alert("寄信成功!")
  }).catch( err => {
    window.alert("寄信失敗, 請連繫dino團隊!")
    console.log(err)
  })
}

export const withdrawStudents = (payload) => dispatch => {
  Promise.all(payload.people.map( person =>
    axios.post('/assistants/research/delete', person).then( res => {
    }).catch( err => {
      window.alert("退選" + person.student_id + "失敗, 請連繫dino團隊!")
      console.log(err)
    })
  )).then( res => dispatch(fetchStatus(payload.refresh)))
}

export const getCPEStatus = (payload) => dispatch => {
  dispatch(status_handle_change({ loadingModal: true }))
  axios.post('/assistants/research/getCPEStatus', payload).then( res => {
    dispatch(status_handle_change({
      people: res.data
    }))
    dispatch(status_handle_change({ loadingModal: false }))
  }).catch( err => {
    window.alert('獲取CPE狀態失敗, 請聯繫dino團隊!')
    console.log(err)
  })
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
    dispatch(getCPEStatus(payload.refresh))
  }).catch( err => {
    console.log(err);
  })
}

export const getPendingList = () => dispatch => {
  dispatch(status_handle_change({ loadingModal: true }))
  dispatch(get_pending_teacher_list())
  dispatch(status_handle_change({ loadingModal: false }))
}