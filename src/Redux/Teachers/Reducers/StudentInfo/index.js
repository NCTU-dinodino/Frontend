import { handleActions } from 'redux-actions'

const initialState = {
	studentScore:[
		{
	    "semester":"106下",
	    "failed":true,
	    "avg":40,
	    "credit":20,
	    "score":[
	      {
	        "cn": "線性代數",
	        "en": "Linear Algebra",
	        "score": 98,
	        "pass": true
	      },
	      {
	        "cn": "計算機概論與程式設計",
	        "en": "Introduction to Computers and Programming",
	        "score": 84,
	        "pass": true
	      },
	      {
	        "cn": "資料結構",
	        "en": "Data Structures",
	        "score": 95,
	        "pass": true
	      }
	    ]
		},
		{
	    "semester":"107上",
	    "failed":false,
	    "avg":60,
	    "credit":21,
	    "score":[
	      {
	        "cn": "線性代數",
	        "en": "Linear Algebra",
	        "score": 98,
	        "pass": true
	      },
	      {
	        "cn": "計算機概論與程式設計",
	        "en": "Introduction to Computers and Programming",
	        "score": 84,
	        "pass": true
	      },
	      {
	        "cn": "資料結構",
	        "en": "Data Structures",
	        "score": 95,
	        "pass": true
	      }
	    ]
		}
	],
	studentInfo: [
		{
		  "sname": '吳泓寬',
		  "program": '網多',
		  "graduate":null,
  		"graduate_submit":null,
		  "email": 'student@gmail.com'
		}
	]
}

export default handleActions({
	GET_STUDENT_INFO: (state, action) => {
		return({...state, studentInfo: [...action.payload] })
	},
	GET_STUDENT_SCORE: (state, action) => {
		return({...state, studentScore: [...action.payload] })
	}
}, initialState)