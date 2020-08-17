import { handleActions } from 'redux-actions'

// INITIALIZATIONS FOR REDUCERS, WHICH IS GOING TO TAKE ACTIONS
const initialState = {
  applyList: [
    { research_title: '以GA/PLS/KNN估算車禍訴訟賠償金',
      status: 0,
      year: '108-1',
      first_second: '...',
      participants: [
        { student_id: '0616000',
          sname: '柯文哲',
          email: 'balabala@gmail.com',
          phone: '0912345678',
          first_second: '...',
          student_status: 1
        },
        { student_id: '0616001',
          sname: '連勝文',
          email: 'banana@gmail.com',
          phone: '0911111111',
          first_second: '...',
          student_status: 1
        },
        { student_id: '0611234',
          sname: '韓國瑜',
          email: 'koreanfish@gmail.com',
          phone: '0999999999',
          first_second: '...',
          student_status: 1
        },
        { student_id: '0511111',
          sname: '蘇貞昌',
          email: 'gogogogo@gmail.com',
          phone: '0988888888',
          first_second: '...',
          student_status: 2
        }
      ]
    },
    { research_title: '...',
      status: 0,
      year: '...-...',
      first_second: '...',
      participants: [
        { student_id: '...',
          sname: '...',
          email: '...',
          phone: '',
          first_second: '...',
          student_status: 1
        },
        { student_id: '...',
          sname: '...',
          email: '...',
          phone: '',
          first_second: '...',
          student_status: 1
        },
        { student_id: '...',
          sname: '...',
          email: '...',
          phone: '',
          first_second: '...',
          student_status: 1
        },
        { student_id: '...',
          sname: '...',
          email: '...',
          phone: '',
          first_second: '...',
          student_status: 2
        }
      ]
    },
    { research_title: '棋類遊戲人工智慧-EinSStein Wurfelt nicht',
      status: 2,
      year: '108-1',
      first_second: '...',
      participants: [
        { student_id: '0511123',
          sname: '王金平',
          email: 'wang123@gmail.com',
          phone: '0987654321',
          first_second: '...',
          student_status: 1
        }
      ]
    }
  ],
  research1: {
    cs_number: 0, // 該學期專一加專二人數(資工)
    other_number: 0, // 該學期專一加專二人數(非資工)
    current_accept: 0, // 該學年只含專一的人數
    groups: [
      {
        research_title: '浪漫Duke!帶你找到屬於你的浪漫',
        participants: [
          {
            student_id: '0616000',
            sname: '柯文哲',
            detail: '...',
            score: '98',
            comment: '',
            student_status: 1
          },
          {
            student_id: '0511111',
            sname: '宋楚瑜',
            detail: '...',
            score: '70',
            comment: '',
            student_status: 1
          },
          {
            student_id: '0610111',
            sname: '蔡英文',
            detail: '...',
            score: '88',
            comment: '',
            student_status: 2
          },
          {
            student_id: '0516123',
            sname: '馬英九',
            detail: '...',
            score: '80',
            comment: '',
            student_status: 2
          },
        ],
        year: '109-1',
        first_second: '1'
      },
      {
        research_title: '啊我就怕被罵阿',
        participants: [
          {
            student_id: '0418765',
            sname: '徐永明',
            detail: '...',
            score: '90',
            comment: '',
            student_status: 2
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          }
        ],
        year: '109-1',
        first_second: '2'
      }
    ]
  },
  research2: {
    cs_number: 0,
    other_number: 0,
    current_accept: 0,
    groups: [
      {
        research_title: '...',
        participants: [
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          }
        ],
        year: '109-2',
        first_second: '1'
      }
    ]
  },
  research: {
    cs_number: 0,
    other_number: 0,
    current_accept: 0,
    groups: [
      {
        research_title: '---',
        participants: [
          {
            student_id: '0412121',
            sname: '陳罐頭',
            detail: '...',
            score: ''
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          }
        ],
        year: '108-2'
      },
      {
        research_title: '洨敬白布雞使喚華雄沒醉不女人',
        participants: [
          {
            student_id: '0412121',
            sname: '陳罐頭',
            detail: '...',
            score: ''
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          }
        ],
        year: '108-1'
      },
      {
        research_title: '...',
        participants: [
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          },
          {
            student_id: '...',
            sname: '...',
            detail: '...',
            score: ''
          }
        ],
        year: '...'
      }
    ]
  },
  changeTeacherList: [
    { 
      research_title: '圍棋 AI 擬人化 (Personification of Go AI)',
      status: 0,
      year: '108-2',
      first_second: '...',
      participants: [
        { student_id: '0616000',
          sname: '柯文哲',
          email: 'balabala@gmail.com',
          phone: '0912345678',
          first_second: '...',
          student_status: 1,
          replace_pro: 1
        },
        { student_id: '0616001',
          sname: '蔡英文',
          email: 'vegetable@gmail.com',
          phone: '0987654321',
          first_second: '...',
          student_status: 1,
          replace_pro: 1
        },
        { student_id: '0511777',
          sname: '陳其邁',
          email: 'chenchimai@gmail.com',
          phone: '0955555555',
          first_second: '...',
          student_status: 2,
          replace_pro: 0
        }
      ]
    },
  ],
  loadChangeTeacherList: 1,
  loadApplyList: 1,
  loadReacherList1: 1,
  loadReacherList2: 1
}

// construct reducers
// handleActions(reducerMap, defaultState[, options])
export default handleActions({
  UPDATE_APPLY_LIST: (state, action) => {
    console.log('UPDATE_APPLY_LIST ACTION: ', {...state, applyList: [...action.payload]})
    return ({...state, applyList: [...action.payload], loadApplyList: 0})
  },
  UPDATE_RESEARCH_LIST: (state, action) => {
    console.log('UPDATE_RESEARCH_LIST ACTION: ', { ...state, research: {...action.payload} })
    return ({ ...state, research: {...action.payload} })
  },
  UPDATE_RESEARCH_LIST_1: (state, action) => {
    console.log('UPDATE_RESEARCH_LIST_1 ACTION: ', { ...state, research: {...action.payload} })
    return ({ ...state, research1: {...action.payload}, loadReacherList1: 0})
  },
  UPDATE_RESEARCH_LIST_2: (state, action) => {
    console.log('UPDATE_RESEARCH_LIST_2 ACTION: ', { ...state, research: {...action.payload} })
    return ({ ...state, research2: {...action.payload}, loadReacherList2: 0 })
  },
  UPDATE_CHANGE_TEACHER_LIST: (state, action) => {
    console.log('UPDATE_CHANGE_TEACHER_LIST ACTION: ', { ...state, changeTeacherList: {...action.payload} })
    return ({ ...state, changeTeacherList: [...action.payload], loadChangeTeacherList: 0})
  }
}, initialState)
