import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Frame from './Components/Frame'
import Login from './Pages/Login'

import TeacherHead from './Pages/Teachers/Head'
import TeacherHome from './Pages/Teachers/Home'
import TeacherProject from './Pages/Teachers/Project'
import TeacherCourse from './Pages/Teachers/Course'
import TeacherFamily from './Pages/Teachers/Family'
import TeacherVerify from './Pages/Teachers/Verify'

import AssistantHead from './Pages/Assistants/Head'
import AssistantGradStatus from './Pages/Assistants/Graduation/Status'
import AssistantGradCheck from './Pages/Assistants/Graduation/Check'
import AssistantProject from './Pages/Assistants/Project'
import AssistantMail from './Pages/Assistants/Mail'
import AssistantSetting from './Pages/Assistants/Setting'
import AssistantVerify2 from './Pages/Assistants/Verify_2'

import StudentDetail from './Components/StudentDetail'
import StudentVerify from './Components/StudentVerify'
import StudentList from './Pages/Assistants/Family/StudentList'
import TeacherList from './Pages/Assistants/Family'

import StudentHead from './Pages/Students/Head'
import StudentGrad from './Pages/Students/Graduation'
import StudentRecommend from './Pages/Students/Recommend'
import StudentProfessor from './Pages/Students/Professor'
import StudentProject from './Pages/Students/Project'
// import StudentCredit from './Pages/Students/Credit'
// import StudentCreditApply from './Pages/Students/Credit/Stepper'

import Bulletin from './Pages/Bulletin'
import Footer from './Components/Footer'
// import Snow from 'react-snow-effect'

import AutoLogout from './Components/AutoLogout'

const Router = () => (
  <BrowserRouter>
    <div>
      {/*<Route path='/' component={Snow} />*/}
      <Route path='/students' component={StudentHead} />
      <Route path='/teachers' component={TeacherHead} />
      <Route path='/assistants' component={AssistantHead} />
      <Switch>
        <Route exact path='/' component={Login} />
        {/* students route */}

        <Route exact path='/students/head/' render={() => <Bulletin />} />
        <Route exact path='/students/grad' render={() => <StudentGrad />} />
        <Route exact path='/students/recommend' render={() => <StudentRecommend />} />
        <Route exact path='/students/professor' render={() => <StudentProfessor />} />
        <Route exact path='/students/project' render={() => <StudentProject />} />
        {/* <Route exact path='/students/credit' render={() => <StudentCredit />} />
        {<Route exact path='/students/credit/apply' render={() => <StudentCreditApply />} />} */}

        <Route exact path='/teachers/head' component={TeacherHome} />
        <Route exact path='/teachers/group' component={TeacherProject} />
        <Route exact path='/teachers/project' component={TeacherProject} />
        <Route exact path='/teachers/course' component={TeacherCourse} />
        <Route exact path='/teachers/family' component={TeacherFamily} />
        <Route exact path='/teachers/verify' component={TeacherVerify} />

        <Route exact path='/assistants/head' render={() => <Frame><Bulletin admin /></Frame>} />
        <Route exact path='/assistants/grad' render={() => <Frame><AssistantGradCheck /></Frame>} />
        <Route exact path='/assistants/project' render={() => <Frame><AssistantProject /></Frame>} />
        <Route exact path='/assistants/family' render={() => <Frame><TeacherList /></Frame>} />
        <Route exact path='/assistants/family/:tid' component={StudentList} />
        <Route exact path='/assistants/verify' component={AssistantVerify2} />
        <Route exact path='/assistants/marmot0814/verify' render={ () => <Frame><AssistantVerify2 /></Frame> } />
        <Route exact path='/assistants/course' render={() => <Frame><AssistantGradStatus /></Frame>} />
        <Route exact path='/assistants/mail' render={() => <Frame><AssistantMail /></Frame>} />
        <Route exact path='/assistants/setting' render={() => <Frame><AssistantSetting /></Frame>} />
        <Route path='/assistants/head/s/:sid/:sname/:program/:net_media' component={StudentDetail} />
        <Route path='/assistants/head/c/:sid/:type/:time/:sname/:grade/:program' component={StudentVerify} />
      </Switch>
      <Route path='/' component={Footer} />
    </div>
  </BrowserRouter>
)

export default AutoLogout(Router)
