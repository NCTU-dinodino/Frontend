import React from 'react'

import './Graduation.css'
import GraduationForm from './GraduationForm'
import LinearProgressExampleDeterminate from './OverviewProgress'
import TopButton from './TopButton';
import CircularProgress from './CircularProgress'
import PrintForm from './GradTable/PrintForm'
import Toggle from 'material-ui/Toggle';
import {ToastContainer, ToastStore} from 'react-toasts';
import Popover from 'react-simple-popover';
import ReactHover from 'react-hover';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import scrollToComponent from 'react-scroll-to-component'
import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/image/assistant';
import axios from 'axios'
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const styles = {
    toggle: {
        marginBottom: 0,
        maxWidth: 200,
        width:'400px',
        float:'left',
        margin:'15px 10px 0 20px',
    },
    button: {
        margin:'9px 10px 0 0px',
        width:'100px',
        float:'left'
    },
    buttonDia: {
        margin:'0 10px 0 10px',
        width:'100px'
    },
    buttonEn: {
        margin:'9px 10px 0 0px',
        width:'150px',
        float:'left'
    },
    labelStyle: {
        fontFamily: 'Noto Sans CJK TC',
        color: '#7B7B7B'
    },
    medium:{
        padding:'15px 0 0 5px',
        width: 10,
        height: 10,
        float:'left',
        color: '#7B7B7B'
    },
    pop:{
        width:'auto',
        height: 'auto',
    }
};


const optionsCursorTrueWithMargin = {
    followCursor: true,
    shiftX: 10,
    shiftY: -30
};

class Grad extends React.Component {
    state={
        scrollQuery:'',
        isToggle:true,
        open:false,
        opendialog: false,
        opendialog1: false,
        opendialogprint: false,
        graduationCheck:false,
        graduationCheckEnglishTest:false,
        Graduationitems:[],
        items:[],
        totalitems:[],
        courseCategoryArray:[],
    };
    componentWillMount(){
        this.setState({
            items:this.props.items,
            Graduationitems:this.props.revise,
            totalitems:this.props.result
        });
        let _this=this;
        axios.get('/students/graduate/check').then(studentData => {
            _this.setState({
                graduationCheck : studentData.data.check.state
            })
        }).catch(err => {
            console.log(err);
        });
        axios.get('/students/graduate/english').then(studentData => {
            _this.setState({
                graduationCheckEnglishTest : studentData.data.check.state
            })
        }).catch(err => {
            console.log(err);
        });
    }

    //For updating as props changes!!!
    componentDidUpdate(prevProps, prevState){
        if( prevProps.items !== this.props.items ||
            prevProps.revise !== this.props.revise ||
            prevProps.result !== this.props.result ) {
            this.setState({
                items:this.props.items,
                Graduationitems:this.props.revise,
                totalitems:this.props.result
            });
        }
    }

    handleClick(e){
        this.setState({
            scrollQuery:e,
        });
    }
    scrollTotop(){
        scrollToComponent(this.refs.my);
    }
    printGradTable(fileName) {
        let original = document.title;
        if (fileName !== null)
            document.title = fileName;
        window.print();
        document.title = original;
        this.setState({
            scrollQuery:'',opendialogprint: true});
        return true;
    }
    handleToggle(){
        this.setState({
            scrollQuery:'',
            isToggle:!this.state.isToggle
        });
        if(this.state.isToggle){
            this.setState({
                totalitems:this.props.reviseresult
            });
            ToastStore.info(<div  className="text">已幫您自動排序，欲知排序依據請點選自動排序旁的星號標誌，此為系統自動排序僅以參考為主。</div>, 20000);
        }
        else{
            this.setState({
                totalitems:this.props.result
            });
        }
    }
    handleClickview(e) {
        this.setState({
            scrollQuery:'',
            open: !this.state.open,
            isToggle:this.state.isToggle
        });
    }


    handleClose(e) {
        this.setState({
            scrollQuery:'',
            open: false
        });
    }
    sendReview(){
        axios.post('/students/graduate/check', {
            check:{state:true}
        })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            });
        this.setState({
            graduationCheck:true,
            opendialog1: false
        });

    }
    sendEnglishTest(){
        let _this=this;
        axios.post('/students/graduate/english', {
            check:{state:true}
        })
            .then(res => {
                ()=>this.EnglishCallBack();
            })
            .catch(err => {
                console.log(err)
            });
        _this.setState({
            graduationCheckEnglishTest:true,
            opendialog: false
        });
    }

    EnglishCallBack(){
        let _this = this;
        axios.get('/students/graduate/revised').then(studentData => {
            _this.setState({
                Graduationitems:studentData.data
            })
        }).catch(err => {
            console.log(err);
        });

    }

    handleClosedialog1 = () => {
        this.setState({
            scrollQuery:'',opendialog1: false});
    };

    handleOpen1 = () => {
        this.setState({
            scrollQuery:'',opendialog1: true});
    };

    handleClosedialogprint = () => {
        this.setState({opendialogprint: false});
    };

    handleClosedialog = () => {
        this.setState({opendialog: false});
    };

    handleOpen = () => {
        this.setState({
            scrollQuery:'',opendialog: true});
    };
    render(){

        const actions1 = [

            <MuiThemeProvider>
                <RaisedButton style={styles.buttonDia}
                              labelStyle={styles.labelStyle}
                              backgroundColor = "#DDDDDD"
                              label="取消"
                              keyboardFocused={true}
                              onClick={this.handleClosedialog1}/>
            </MuiThemeProvider>,
            <MuiThemeProvider>
                <RaisedButton style={styles.buttonDia}
                              labelStyle={styles.labelStyle}
                              backgroundColor = "#DDDDDD"
                              label="確認"
                              keyboardFocused={true}
                              onClick={() => this.sendReview()}
                />
            </MuiThemeProvider>,
        ];

        const actions2 = [

            <MuiThemeProvider>
                <RaisedButton style={styles.buttonDia}
                              labelStyle={styles.labelStyle}
                              backgroundColor = "#DDDDDD"
                              label="否"
                              keyboardFocused={true}
                              onClick={this.handleClosedialog}/>
            </MuiThemeProvider>,
            <MuiThemeProvider>
                <RaisedButton style={styles.buttonDia}
                              labelStyle={styles.labelStyle}
                              backgroundColor = "#DDDDDD"
                              label="是"
                              keyboardFocused={true}
                onClick={()=>this.sendEnglishTest()}
            />
            </MuiThemeProvider>,
        ];

        const actions3 = [

            <MuiThemeProvider>
                <RaisedButton style={styles.buttonDia}
                              labelStyle={styles.labelStyle}
                              backgroundColor = "#DDDDDD"
                              label="確認"
                              keyboardFocused={true}
                              onClick={this.handleClosedialogprint}/>
            </MuiThemeProvider>
        ];
        return (
            <div>
                <div className="font_adjust">
                    <ToastContainer store={ToastStore}/>
                    <div className="fixed" onClick={()=>this.scrollTotop()}>
                        <TopButton/>
                    </div>
                    <div className="Grad-title-adjust" ref="my">
                        <div className="Grad-title-text">
                            {this.props.assistant?
                                <div>
                                    <div id="lessons-little-title-grad">資工系{this.props.studentProfile.program}組 - {this.props.studentProfile.student_id}{this.props.studentProfile.sname}</div>
                                </div>
                            :
                                <div>
                                    <div id="lessons-title">畢業預審</div>
                                    <div id="lessons-little-title-grad">-資工系{this.props.studentProfile.program}組</div>
                                </div>
                            }

                        </div>

                        <div className="tip">
                            <div className="green"> </div><div className="text">已通過</div>
                            <div className="red"> </div><div  className="text">未通過</div>
                            <div className="gray"> </div><div  className="text">未修課</div>
                            <div className="yellow"> </div><div  className="text">未抵免課程</div>
                            <div className="purple"> </div><div  className="text">免修或抵免課程</div>
                            <div className="blue"> </div><div  className="text">當期課程</div>
                            <div>
                                <ReactHover options={optionsCursorTrueWithMargin}>
                                    <ReactHover.Trigger type='trigger'>
                                        <MuiThemeProvider>
                                            <RaisedButton
                                                label={ this.props.assistant ?
                                                    this.state.graduationCheck?"已送審":"未送審"
                                                    :
                                                    this.state.graduationCheck?"已送審":"確認送審"}
                                                disabled={this.props.assistant ?true : this.state.graduationCheck}
                                                style={styles.button}
                                                labelStyle={styles.labelStyle}
                                                backgroundColor = "#DDDDDD"
                                                onClick={this.handleOpen1}
                                            />
                                        </MuiThemeProvider>
                                    </ReactHover.Trigger>
                                    <ReactHover.Hover type='hover'>
                                    </ReactHover.Hover>
                                </ReactHover>

                                <MuiThemeProvider>
                                    <Dialog
                                        title="注意"
                                        actions={actions1}
                                        modal={false}
                                        style={styles.labelStyle}
                                        open={this.state.opendialog1}
                                        onRequestClose={this.handleClosedialog1}
                                    >
                                        <div style={styles.labelStyle}>按下確認讓助理知道您看過這個網站。</div>
                                    </Dialog>
                                </MuiThemeProvider>
                                <MuiThemeProvider>
                                    <RaisedButton style={styles.button}
                                                  labelStyle={styles.labelStyle}
                                                  backgroundColor = "#DDDDDD"
                                                  label="列印"
                                                  onClick={() => this.printGradTable('103學年度畢業預審表-'+this.props.studentProfile.student_id)}/>
                                </MuiThemeProvider>

                                <MuiThemeProvider>
                                    <Dialog
                                        title="注意"
                                        actions={actions3}
                                        modal={false}
                                        style={styles.labelStyle}
                                        open={this.state.opendialogprint}
                                        onRequestClose={this.handleClosedialogprint}
                                    >
                                        <div style={styles.labelStyle}>列印系統所排之課程預審。<br/>專業選修, 其他選修,外文,的課程請自行填寫調整。</div>
                                    </Dialog>
                                </MuiThemeProvider>
                                <MuiThemeProvider>
                                    <RaisedButton style={styles.buttonEn}
                                                  labelStyle={styles.labelStyle}
                                                  backgroundColor = "#DDDDDD"
                                                  label={this.state.graduationCheckEnglishTest?"已考過英檢":"是否考過英檢?"}
                                                  disabled={this.state.graduationCheckEnglishTest}
                                                  onClick={this.handleOpen}/>
                                </MuiThemeProvider>

                                <MuiThemeProvider>
                                    <Dialog
                                        title="注意"
                                        actions={actions2}
                                        modal={false}
                                        style={styles.labelStyle}
                                        open={this.state.opendialog}
                                        onRequestClose={this.handleClosedialog}
                                    >
                                        <div style={styles.labelStyle}>須通過英檢後再按'是'，按下'是'後可確認看看自動排序。</div>
                                    </Dialog>
                                </MuiThemeProvider>
                                <MuiThemeProvider>
                                    <Toggle
                                        label="系統自動排序"
                                        style={styles.toggle}
                                        labelStyle={styles.labelStyle}
                                        onToggle={(toggled)=>this.handleToggle()}
                                    />
                                </MuiThemeProvider>
                                <MuiThemeProvider>
                                    <IconButton style={styles.medium}
                                                tooltip="排序依據"
                                                tooltipPosition="top-right"
                                                ref="target"
                                                onClick={()=>this.handleClickview()}>
                                        <ActionGrade />
                                    </IconButton>
                                </MuiThemeProvider>
                                <Popover
                                    placement='bottom'
                                    target={this.refs.target}
                                    show={this.state.open}
                                    onHide={this.handleClose.bind(this)}>
                                    <div
                                        style={styles.pop}>
                                        -未排的<br/>
                                        物理學分放置規則：於必修項目會算為3學分,多的2學分將優先放至專業選修,若專業選修已滿,則會放至其他選修,物理也會顯示在該項項目中<br/>
                                        -排序過的<br/>
                                        重複修課：將只顯示一次,取成績最高的那次<br/>
                                        必修：若有多修物理,化學或生物,會將多修的課程優先放至專業選修,若專業選修學分已滿,則放至其他選修<br/>
                                        物理學分放置規則：於必修項目會算為3學分,多的2學分將優先放至專業選修,若專業選修已滿,則會放至其他選修,物理也會顯示在該項項目中<br/>
                                        核心課程/副核心及他組合心課程：若該項總學分已達畢業標準,會將多修的課程優先放至專業選修,若專業選修學分已滿,則放至其他選修<br/>
                                        專業選修/外語/通識：若該項總學分已達畢業標準,會將多修的課程放至其他選修<br/>
                                    </div>
                                </Popover>
                            </div>
                        </div>
                        <div className="schedule-bar">
                            <div className="circle-progress">
                                <div className="circle-in">畢業{this.state.totalitems.total}/{this.state.totalitems.total_require}</div>
                                <CircularProgress grad={this.state.totalitems.total/this.state.totalitems.total_require*100}/>
                            </div>
                            <div className="overview">
                            <div className="overview-course" >
                                <div className="showcourseoverview" onClick={()=>this.handleClick('共同必修')}>共同必修&nbsp;&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.compulsory}</font>/{this.state.totalitems.compulse_require}&nbsp;學分<br/><LinearProgressExampleDeterminate grad={this.state.totalitems.compulsory/this.state.totalitems.compulse_require*100}/></div>
                                <div className="showcourseoverview" onClick={()=>this.handleClick('核心課程')}>核心課程&nbsp;&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.core}</font>/{this.state.totalitems.core_require}&nbsp;學分<br/><LinearProgressExampleDeterminate grad={this.state.totalitems.core/this.state.totalitems.core_require*100}/></div>
                                <div className="showcourseoverview" onClick={()=>this.handleClick('服務學習')}>服務學習&nbsp;&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.service}</font>/{this.state.totalitems.service_require}&nbsp;門<br/><LinearProgressExampleDeterminate grad={this.state.totalitems.service/this.state.totalitems.service_require*100}/></div>
                            </div>
                            <div className="overview-course" >
                                <div className="showcourseoverview" onClick={()=>this.handleClick('英文授課')}>英文授課&nbsp;&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.english}</font>/{this.state.totalitems.english_require}&nbsp;門<br/><LinearProgressExampleDeterminate grad={this.state.totalitems.english/this.state.totalitems.english_require*100}/></div>
                                <div className="showcourseoverview" onClick={()=>this.handleClick('藝文賞析')}>藝文賞析&nbsp;&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.art}</font>/{this.state.totalitems.art_require}&nbsp;門<br/><LinearProgressExampleDeterminate grad={this.state.totalitems.art/this.state.totalitems.art_require*100}/></div>
                                <div className="showcourseoverview" onClick={()=>this.handleClick('其他選修')}>其他選修&nbsp;&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.other}</font>/{this.state.totalitems.other_require}&nbsp;學分<br/><LinearProgressExampleDeterminate grad={this.state.totalitems.other/this.state.totalitems.other_require*100}/></div>
                            </div>
                            <div className="overview-course" >
                                <div className="showcourseoverview" onClick={()=>this.handleClick('通識')}>通&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;識&nbsp;&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.general}</font>/{this.state.totalitems.general_require}&nbsp;學分<br/><LinearProgressExampleDeterminate grad={this.state.totalitems.general/this.state.totalitems.general_require*100}/></div>
                                <div className="showcourseoverview" onClick={()=>this.handleClick('體育')}>體&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;育&nbsp;&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.pe}</font>/{this.state.totalitems.pe_require}&nbsp;門<br/><LinearProgressExampleDeterminate grad={this.state.totalitems.pe/this.state.totalitems.pe_require*100}/></div>
                                <div className="showcourseoverview" onClick={()=>this.handleClick('外語')}>外&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;文&nbsp;&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.language}</font>/{this.state.totalitems.language_require}&nbsp;學分<br/><LinearProgressExampleDeterminate grad={this.state.totalitems.language/this.state.totalitems.language_require*100}/></div>
                            </div>
                                <div className="overview-course" >
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('副核心與他組核心')}>副核心與他組核心&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.vice}</font>/{this.state.totalitems.vice_require}&nbsp;學分<br/><LinearProgressExampleDeterminate grad={this.state.totalitems.vice/this.state.totalitems.vice_require*100}/></div>
                                    <div className="showcourseoverview" onClick={()=>this.handleClick('專業選修')}>專業選修&nbsp;&nbsp;<font size={5} color='#338d68'>{this.state.totalitems.pro}</font>/{this.state.totalitems.pro_require}&nbsp;學分<br/><LinearProgressExampleDeterminate grad={this.state.totalitems.pro/this.state.totalitems.pro_require*100}/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Grad-Row">
                        <GraduationForm isToggle={this.state.isToggle} items={this.state.items} graditems={this.state.Graduationitems} scroll={this.state.scrollQuery}/>
                    </div>
                    <div id="graduate-footer"> </div>
                </div>
                <div id="printArea">
                    <PrintForm profile={this.props.studentProfile} courseCategoryArray={this.props.courseCategoryArray}/>
                </div>
            </div>
        )
    }
}

export default Grad
