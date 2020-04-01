import { createAction } from 'redux-actions'
import axios from 'axios'

// export const store_teachers = createAction('STORE_TEACHERS')
// export const update_add_status = createAction('UPDATE_ADD_STATUS')
// export const update_first_second = createAction('UPDATE_FIRST_SECOND')
// export const delete_research = createAction('DELETE_RESEARCH')
// export const storeScoreCsvData = createAction('STORE_SCORE_CSV_DATA')
// export const storeScoreCsvDataStart = createAction('STORE_SCORE_CSV_DATA_START')


// export const fetchTeachers = (post_item) => dispatch => {
//   axios.post('/_api/assistants/research/professorList', post_item).then(res => {
//     dispatch(store_teachers(res.data))
//   }).catch(err => {
//     console.log(err)
//   })
// }

export const status_handle_change = createAction('PROJECT_STATUS_HANDLE_CHANGE');

export const statusHandleChange = (payload) => dispatch => {
    dispatch(status_handle_change(payload));
}

export const fetchStatus = (payload) => dispatch => {
  axios.post('/_api/assistants/research/professorList', payload).then(res => {
    dispatch(status_handle_change({
      teachers: res.data.map( teacher => ({
          ...teacher,
          gradeCnt: teacher.accepted.projects.reduce( (sum, project) => {
            return sum + project.students.filter( student => student.status === "1" ).length
          }, 0)
      }))
    }))
  }).catch(err => {
    console.log(err)
  })
}

export const fetchCsv = (payload) => dispatch => {
  dispatch(status_handle_change({csvDone: false}))
  axios.post('/_api/assistants/research/professorListDownload', payload).then(res => {
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