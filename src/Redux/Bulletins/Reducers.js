
import { handleActions } from 'redux-actions'
import { FETCHING_STATUS } from '../../Utilities/constant'

const initialState = {
  index: {
    data: [// 20191204151943
// https://dinodino.nctu.edu.tw/bulletin
  {
    "id": "1",
    "type": 1,
    "content": "已匯入107下與108上當期課程",
    "link": "",
    "timestamp": "2019-11-19 16:22:26"
  },
  {
    "id": "2",
    "type": 1,
    "content": "修正課程移動錯誤",
    "link": "",
    "timestamp": "2019-11-19 16:22:44"
  },
  {
    "id": "5",
    "type": 0,
    "content": "本系統為系上開發之輔助系統,為幫助學生了解課程地圖與自身修課狀況。系統之修課資料為註冊組提供,然提供資料之時間點恐與學生提送各類申請之時間有差異,故資料難以和校方同步。若發現本系統資料與學籍系統有差異,請以學籍系統為主,並手動修改預審表紙本即可,謝謝。",
    "link": "",
    "timestamp": "2019-11-20 10:45:00"
  },
  {
    "id": "6",
    "type": 0,
    "content": "108學年度第1學期學士班畢業學分預審作業公告(請於12/10前繳交預審表紙本)  (點此瞭解更多)",
    "link": "https://www.cs.nctu.edu.tw/announcements/detail/5647",
    "timestamp": "2019-11-20 10:45:26"
  },
  {
    "id": "7",
    "type": 0,
    "content": "畢業預審學生端操作說明 (點此下載)",
    "link": "https://drive.google.com/file/d/1bCOY0-xg5DK-U4kvX7BHMcgEKi8ysmkC/view",
    "timestamp": "2019-11-20 10:45:51"
  },
  {
    "id": "8",
    "type": 0,
    "content": "108學年度以前入學之學士班學生，得以其入學年度之任一組之必修科目表作為畢業資格審核依據。 (點此瞭解更多)",
    "link": "https://www.cs.nctu.edu.tw/announcements/detail/4444",
    "timestamp": "2019-11-20 10:48:37"
  },
  {
    "id": "9",
    "type": 0,
    "content": "學生畢業前須通過學術倫理教育，通過與否未於本系統呈現，請自行至學籍系統確認",
    "link": "",
    "timestamp": "2019-11-20 10:53:13"
  },
  {
    "id": "10",
    "type": 0,
    "content": "107學年度(含)以後入學的學生，畢業前須通過性別平等教育線上課程，通過與否未於本系統呈現，請自行至學籍系統確認。",
    "link": "",
    "timestamp": "2019-11-20 10:59:55"
  },
  {
    "id": "11",
    "type": 0,
    "content": "本系統尚不適用於外籍學生(This system is not yet applicable to foreign students)，以及本系跨域生。本系跨域生請至教發中心下載跨域學程畢業學分審查表，跑紙本流程。",
    "link": "",
    "timestamp": "2019-11-20 11:01:06"
  },
  {
    "id": "12",
    "type": 0,
    "content": "必修課程須修習本系所開授之課程。必修課程需重修，然因不可抗拒之理由，需修習外系所或本院研究所所開課程，以抵本系必修課程者，須於修習前至本系統提送申請，申請時間請參閱每學期系網頁公告。\n申請通過者，如課程名稱與本系必修課程不一致，請務必於修習通過取得學分後提送學分抵免申請，系統才會將該門課列為已抵免課程。",
    "link": "",
    "timestamp": "2019-11-27 10:37:18"
  }
],
    status: FETCHING_STATUS.IDLE
  },
  new: {
    status: FETCHING_STATUS.IDLE
  },
  edit: {
    status: FETCHING_STATUS.IDLE
  },
  delete: {
    status: FETCHING_STATUS.IDLE
  }
}

export default handleActions({
  BULLETINS: {
    INDEX: {
      STORE: (state, action) => ({ ...state, index: { ...state.index, data: action.payload } }),
      SET_STATUS: (state, action) => ({ ...state, index: { ...state.index, status: action.payload } })
    },
    NEW: {
      SET_STATUS: (state, action) => ({ ...state, new: { ...state.new, status: action.payload } })
    },
    EDIT: {
      SET_STATUS: (state, action) => ({ ...state, edit: { ...state.edit, status: action.payload } })
    },
    DELETE: {
      SET_STATUS: (state, action) => ({ ...state, delete: { ...state.delete, status: action.payload } })
    }
  }
}, initialState)
