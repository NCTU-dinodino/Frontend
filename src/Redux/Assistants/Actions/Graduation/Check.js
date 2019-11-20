import { createAction } from 'redux-actions'
import axios from 'axios'

export const check_handle_change = createAction('GRADUATION_CHECK_HANDLE_CHANGE');
export const update_graduate_status = createAction('UPDATE_GRADUATE_STATUS')

export const checkHandleChange = (payload) => dispatch => {
  dispatch(check_handle_change(payload));
}

export const fetchCheck = () => dispatch => {
  dispatch(check_handle_change({csvDone: false}));
	axios.all([
		axios.post('/assistants/graduate/studentList', {
			grade: '二'
		}),
		axios.post('/assistants/graduate/studentList', {
			grade: '三'
		}),
		axios.post('/assistants/graduate/studentList', {
			grade: '四'
		})
	]).then(axios.spread((second_res, third_res, fourth_res) => {
		dispatch(check_handle_change({
			checks: [
				...second_res.data
          .filter( _ => _.submit_status === 1 || _.submit_status === 2 || _.submit_status === 3)
					.map( check => ({...check, grade: '二'})),
				...third_res.data
          .filter( _ => _.submit_status === 1 || _.submit_status === 2 || _.submit_status === 3)
					.map( check => ({ ...check, grade: '三'})),
				...fourth_res.data
          .filter( _ => _.submit_status === 1 || _.submit_status === 2 || _.submit_status === 3)
					.map( check => ({ ...check, grade: '四'}))
			].sort( (a, b) => a.student_id - b.student_id ),
      csvDone: true,
      csvArr: parseCsv([
        ...second_res.data
          .filter( _ => _.submit_status === 1 || _.submit_status === 2 || _.submit_status === 3)
          .map( check => ({...check, grade: '二'})),
        ...third_res.data
          .filter( _ => _.submit_status === 1 || _.submit_status === 2 || _.submit_status === 3)
          .map( check => ({ ...check, grade: '三'})),
        ...fourth_res.data
          .filter( _ => _.submit_status === 1 || _.submit_status === 2 || _.submit_status === 3)
          .map( check => ({ ...check, grade: '四'}))
      ])
    }))
    dispatch(triggerUpdateDataByStudentIds([
      ...second_res.data.filter( _ => _.submit_status === 1 ).map( _ => _.student_id ),
      ...third_res.data.filter( _ => _.submit_status === 1 ).map( _ => _.student_id ),
      ...fourth_res.data.filter( _ => _.submit_status === 1 ).map( _ => _.student_id )   
    ]))
	})).catch( err => console.log(err) )
}

const parseCsv = (data) => {
  console.log("input")
  console.log(data)
  let csvArr = []
  csvArr.push([
    '學號',
    '組別',
    '預審狀態',
    '畢業狀態',
    '本學期必過課程',
    '尚缺課程或學分數'
  ])

  for (let i = 0; i < data.length; i++) {
    let data_ = data[i][0]
    if (data_ === undefined) continue
    let condition = ''
    let conditionIndex = 1
    let compulse = ''
    for (let j = 0; j < data_.compulse.length; j++) {
      compulse += data_.compulse[j]
      compulse += ','
    }
    if (compulse !== '') {
      compulse = compulse.substring(0, compulse.length - 1)
      condition += (conditionIndex + '. 共同必修缺' + compulse + '\r\n')
      conditionIndex++
    }
    if (data_.pro !== '0') {
      condition += (conditionIndex + '. 專業選修缺' + data_.pro + ' 學分\r\n')
      conditionIndex++
    }
    if (data_.other !== '0') {
      condition += (conditionIndex + '. 其他選修缺' + data_.other + ' 學分\r\n')
      conditionIndex++
    }
    if (data_.submit_type === '0') {
      if (parseInt(data_.old_total, 10) !== 0) {
        condition += (conditionIndex + '. 舊制通識缺' + parseInt(data_.old_total, 10) + ' 學分\r\n')
        conditionIndex++
      }
      if (parseInt(data_.old_contemp, 10) !== 0) {
        condition += (conditionIndex + '. 通識當代向度缺' + parseInt(data_.old_contemp, 10) + ' 學分\r\n')
        conditionIndex++
      }
      if (parseInt(data_.old_culture, 10) !== 0) {
        condition += (conditionIndex + '. 通識文化向度缺' + parseInt(data_.old_culture, 10) + ' 學分\r\n')
        conditionIndex++
      }
      if (parseInt(data_.old_history, 10) !== 0) {
        condition += (conditionIndex + '. 通識歷史向度缺' + parseInt(data_.old_history, 10) + ' 學分\r\n')
        conditionIndex++
      }
      if (parseInt(data_.old_citizen, 10) !== 0) {
        condition += (conditionIndex + '. 通識公民向度缺' + parseInt(data_.old_citizen, 10) + ' 學分\r\n')
        conditionIndex++
      }
      if (parseInt(data_.old_group, 10) !== 0) {
        condition += (conditionIndex + '. 通識群己向度缺' + parseInt(data_.old_group, 10) + ' 學分\r\n')
        conditionIndex++
      }
      if (parseInt(data_.old_science, 10) !== 0) {
        condition += (conditionIndex + '. 通識自然向度缺' + parseInt(data_.old_science, 10) + ' 學分\r\n')
        conditionIndex++
      }
    } else if (data_.submit_type === '1') {
      if (parseInt(data_.new_total, 10) !== 0) {
        condition += (conditionIndex + '. 新制通識缺' + parseInt(data_.new_total, 10) + ' 學分\r\n')
        conditionIndex++
      }

      if (parseInt(data_.new_core_total, 10) !== 0) {
        condition += (conditionIndex + '. 通識核心向度缺' + parseInt(data_.new_core_total, 10) + ' 學分\r\n')
        conditionIndex++
      }
      if (parseInt(data_.new_core_society, 10) !== 0) {
        condition += (conditionIndex + '. 通識核心社會向度缺' + parseInt(data_.new_core_society, 10) + ' 學分\r\n')
        conditionIndex++
      }
      if (parseInt(data_.new_core_humanity, 10) !== 0) {
        condition += (conditionIndex + '. 通識核心人文向度缺' + parseInt(data_.new_core_humanity, 10) + ' 學分\r\n')
        conditionIndex++
      }
      if (parseInt(data_.new_basic, 10) !== 0) {
        condition += (conditionIndex + '. 通識校基本素養向度缺' + parseInt(data_.new_basic, 10) + ' 學分\r\n')
        conditionIndex++
      }
      if (parseInt(data_.new_cross, 10) !== 0) {
        condition += (conditionIndex + '. 通識跨院向度缺' + parseInt(data_.new_cross, 10) + ' 學分\r\n')
        conditionIndex++
      }
    }
    if (data_.en_status === '0') {
      condition += (conditionIndex + '. 未通過英語測驗\r\n')
      conditionIndex++
    }
    if (parseInt(data_.pe, 10) !== 0) {
      condition += (conditionIndex + '. 體育缺' + parseInt(data_.pe, 10) + ' 門\r\n')
      conditionIndex++
    }
    if (parseInt(data_.service, 10) !== 0) {
      condition += (conditionIndex + '. 服務學習缺' + parseInt(data_.service, 10) + ' 門\r\n')
      conditionIndex++
    }
    if (parseInt(data_.art, 10) !== 0) {
      condition += (conditionIndex + '. 藝文賞析缺' + parseInt(data_.art, 10) + ' 門\r\n')
      conditionIndex++
    }
    if (parseInt(data_.mentor, 10) !== 0) {
      condition += (conditionIndex + '. 導師時間缺' + parseInt(data_.mentor, 10) + ' 門\r\n')
      conditionIndex++
    }
    csvArr.push([
      data_.student_id,
      data_.program,
      data_.submit_status === '0' ? '未送審' : data_.submit_status === '1' ? '審核中' : data_.submit_status === '2' ? '已通過' : data_.submit_status === '3' ? '未通過' : '',
      data_.graduate_status === '0' ? '未符合' : data_.graduate_status === '1' ? '將符合' : data_.graduate_status === '2' ? '已符合' : '',
      compulse,
      condition
    ])
  }
  return csvArr
}


export const updateGraduateStatus = payload => dispatch => {
	axios.post('/assistants/graduate/graduateCheck', payload).then( res => {
		dispatch(update_graduate_status(payload))
	}).catch( err => console.log(err) )
}

export const triggerUpdateDataByStudentIds = (payload) => dispatch => {
  payload.map( student_id => 
    axios.get('/assistants/graduate/studentListUpdate', {
      params: { student_id }
    }
  ))
}