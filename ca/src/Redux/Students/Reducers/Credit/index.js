import { handleActions } from 'redux-actions'

const initialState = {
  compulsoryCourse: {
    student_id: '', // 可能需要
    apply_year: '',
    phone: '',
    apply_semester: '',
    department: '', // 原課程的depart
    teacher: '', // 原課程teacher
    original_course_name: '', // 可能需要
    original_course_code: '', // 可能需要
    course_name: '',
    course_code: '',
    course_type: '必修',
    credit: '', // 可能需要(新課程的credit)
    reason: '',
    file: ''
  },
  englishCourse: {
    apply_year: '',
    apply_semester: '',
    phone: '',
    reason: '',
    department: '',
    teacher: '',
    course_code: '',
    course_name: '',
    file: ''
  },
  waiveCourse: {
    phone: '',
    original_school: '',
    original_department: '',
    current_school: '',
    current_department: '',
    original_graduation_credit: '',
    apply_year: 0,
    apply_semester: 0,
    original_course_name: '',
    original_course_department: '',
    original_course_credit: '',
    original_course_score: '',
    current_course_code: '',
    current_course_credit: ''
  },
  creditInfo: {}
}

export default handleActions({
  COMPULSORY_COURSE_CHANGE: (state, action) => ({
    ...state,
    compulsoryCourse: {
      ...state.compulsoryCourse,
      ...action.payload
    }
  }),
  ENGLISH_COURSE_CHANGE: (state, action) => ({
    ...state,
    englishCourse: {
      ...state.englishCourse,
      ...action.payload
    }
  }),
  WAIVE_COURSE_CHANGE: (state, action) => ({
    ...state,
    waiveCourse: {
      ...state.waiveCourse,
      ...action.payload
    }
  }),
  STORE_CREDIT_INFO: (state, action) => ({
    ...state,
    creditInfo: action.payload
  }),
  RESET_COURSE: (state, action) => ({
    ...state,
    compulsoryCourse: initialState.compulsoryCourse,
    englishCourse: initialState.englishCourse,
    waiveCourse: initialState.waiveCourse
  })
}, initialState)
