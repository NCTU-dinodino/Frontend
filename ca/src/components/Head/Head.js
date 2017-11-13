import React, { Component } from 'react';
import './StudentsHead.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import ReactDOM from 'react-dom';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';

import Home from 'material-ui/svg-icons/content/flag';
import Map from 'material-ui/svg-icons/maps/map';
import Graduation from 'material-ui/svg-icons/social/school';
import Check from 'material-ui/svg-icons/av/featured-play-list';
import defalt from './defalt.jpg';

import HomeItem from './Home/Home.js';
import MapItem from './Map/MapComponents/Map.js';
import GraduationItem from './Graduation/Graduation.js';
import CreditItem from './Credit/Credit.js';

import FadeIn from 'react-fade-in';

const homeIcon = <Home />;
const mapIcon = <Map />;
const graduationIcon = <Graduation />;
const checkIcon = <Check />;

let MapCourseData;
let StudentCosPas;

let Graduationitems=[
    { title: '必修課程',
        credit: '80',
        require: '60',
        selection: true,
        course:
            [ { cn: '作業系統概論', en: 'Introduction to Operating Systems',"score":60 ,complete:true, grade:'0'},
                { cn: '基礎程式設計', en: 'Basic Programming',"score":60  ,complete:true, grade:'C'},
                { cn: '微積分(一)', en: 'Calculus (I)' ,"score":60 ,complete:true, grade:'B',reason:'now'},
                { cn: '微積分(二)', en: 'Calculus (II)',"score":60  ,complete:true, grade:'A'},
                { cn: '微處理機系統實驗', en: 'Microprocessor System Lab.',"score":60  ,complete:true, reason:'notCS', grade:'0'},
                { cn: '數位電路設計', en: 'Digital Circuit Design',"score":60  ,complete:false, reason:'now'},
                { cn: '機率', en: 'Probability' ,"score":60 ,complete:true, reason:'free1'},
                { cn: '正規語言概論', en: 'Introduction to Formal Language' ,complete:true,"score":60 , reason:'free2'},
                { cn: '演算法概論', en: 'Introduction to Algorithms' ,complete:false,"score":60 },
                { cn: '物化生三合一(一)', en: '' ,complete:true,"score":60 },
                { cn: '物化生三合一(二)', en: '' ,complete:true,"score":60 },
                { cn: '線性代數', en: 'Linear Algebra' ,complete:true},
                { cn: '編譯器設計概論', en: 'Intro. to Compiler Design' ,complete:true},
                { cn: '計算機概論與程式設計',
                    en: 'Introduction to Computers and Programming' ,complete:true},
                { cn: '計算機組織', en: 'Computer Organization' ,complete:true},
                { cn: '計算機網路概論', en: 'Intro. to Computer Networks' ,complete:true},
                { cn: '資料結構與物件導向程式設計',
                    en: 'Data Structures and Object-oriented Programming' ,complete:true},
                { cn: '資訊工程專題(一)',
                    en: 'Computer Science and Engineering Projects (I)' ,complete:true},
                { cn: '資訊工程專題(二)',
                    en: 'Computer Science and Engineering Projects (II)' ,complete:true},
                { cn: '資訊工程研討', en: 'Computer Science Seminars' ,complete:true},
                { cn: '離散數學', en: 'Discrete Mathematics' ,complete:true} ],
        notPas: [],
        complete: 'True' },
    { title: '通識',
        credit: 16,
        require: 20,
        course:
            [ { cn: '心理學概論', en: '', dimension: '群己', complete: true },
                { cn: '當代世界:環境危機與生態永續', en: '', dimension: '通識', complete: true,"score":60 },
                { cn: '幾何造形', en: '', dimension: '自然', complete: true,"score":60 },
                { cn: '經濟學概論', en: '', dimension: '歷史', complete: true ,reason:'now'},
                { cn: '霸權興衰史:從十五世紀至當代', en: '', dimension: '歷史', complete: true ,"score":60,reason:'free2'},
                { cn: '紀錄片製作概論', en: '', dimension: '歷史', complete: true ,"score":60},
                { cn: '台灣史', en: '', dimension: '歷史', complete: true ,"score":60},
                { cn: '當代中國：全球化下的兩岸關係', en: '', dimension: '歷史', complete: true ,"score":60} ] },
    { title: '副核心課程',
        credit: 16,
        require: 20,
        course:
            [ { cn: '心理學概論', en: '', dimension: '群己', complete: true },
                { cn: '當代世界:環境危機與生態永續', en: '', dimension: '通識', complete: true },
                { cn: '幾何造形', en: '', dimension: '自然', complete: true },
                { cn: '經濟學概論', en: '', dimension: '歷史', complete: true } ] },
    { title: '核心課程',
        credit: 16,
        require: 20,
        course:
            [ { cn: '心理學概論', en: '', dimension: '群己', complete: true },
                { cn: '當代世界:環境危機與生態永續', en: '', dimension: '通識', complete: true },
                { cn: '幾何造形', en: '', dimension: '自然', complete: true },
                { cn: '經濟學概論', en: '', dimension: '歷史', complete: true } ] },
    { title: '體育',
        credit: 16,
        require: 20,
        course:
            [ { cn: '心理學概論', en: '', dimension: '群己', complete: true },
                { cn: '當代世界:環境危機與生態永續', en: '', dimension: '通識', complete: true },
                { cn: '幾何造形', en: '', dimension: '自然', complete: true },
                { cn: '經濟學概論', en: '', dimension: '歷史', complete: true } ] },
    { title: '外文',
        credit: '20',
        require: '60',
        course:
            [ { cn: '作業系統概論', en: 'Introduction to Operating Systems' ,complete:true},
                { cn: '基礎程式設計', en: 'Basic Programming' ,complete:true},
                { cn: '微積分(一)', en: 'Calculus (I)' ,complete:true},
                { cn: '微積分(二)', en: 'Calculus (II)' ,complete:true},
                { cn: '微處理機系統實驗', en: 'Microprocessor System Lab.' ,complete:true},
                { cn: '數位電路設計', en: 'Digital Circuit Design' ,complete:true},
                { cn: '機率', en: 'Probability' },
                { cn: '正規語言概論', en: 'Introduction to Formal Language' ,complete:true},
                { cn: '演算法概論', en: 'Introduction to Algorithms' ,complete:true},
                { cn: '物化生三合一(一)', en: '' ,complete:true},
                { cn: '物化生三合一(二)', en: '' ,complete:true},
                { cn: '線性代數', en: 'Linear Algebra' ,complete:true},
                { cn: '編譯器設計概論', en: 'Intro. to Compiler Design' ,complete:true},
                { cn: '計算機概論與程式設計',
                    en: 'Introduction to Computers and Programming' ,complete:true},
                { cn: '計算機組織', en: 'Computer Organization' ,complete:true},
                { cn: '計算機網路概論', en: 'Intro. to Computer Networks' ,complete:true},
                { cn: '資料結構與物件導向程式設計',
                    en: 'Data Structures and Object-oriented Programming' ,complete:true},
                { cn: '資訊工程專題(一)',
                    en: 'Computer Science and Engineering Projects (I)' ,complete:true},
                { cn: '資訊工程專題(二)',
                    en: 'Computer Science and Engineering Projects (II)' ,complete:true},
                { cn: '資訊工程研討', en: 'Computer Science Seminars' ,complete:true},
                { cn: '離散數學', en: 'Discrete Mathematics' ,complete:true} ],
        notPas: [],
        complete: 'True' },{},{},{},{},{"total":113,"total_require":128,"compulsory":55,"compulse_require":58,"core":9,"core_require":"9","vice":9,"vice_require":"9","pro":9,"pro_require":"12","english":0,"english_require":1,"other":0,"other_require":"12","general":20,"general_require":20,"pe":6,"pe_require":6,"language":10,"language_require":8,"service":2,"service_require":2,"art":2,"art_require":2}

];
let revise=[
    { title: '必修程',
        credit: '80',
        require: '60',
        selection: true,
        course:
            [
                { cn: '基礎程式設計', en: 'Basic Programming',"score":60  ,complete:true},
                { cn: '微積分(一)', en: 'Calculus (I)' ,"score":60 ,complete:true},
                { cn: '微積分(二)', en: 'Calculus (II)',"score":60  ,complete:true},
                { cn: '微處理機系統實驗', en: 'Microprocessor System Lab.',"score":60  ,complete:true, reason:'notCS'},
                { cn: '數位電路設計', en: 'Digital Circuit Design',"score":60  ,complete:true},
                { cn: '機率', en: 'Probability' ,"score":60 },
                { cn: '正規語言概論', en: 'Introduction to Formal Language' ,complete:true,"score":60 },
                { cn: '演算法概論', en: 'Introduction to Algorithms' ,complete:true,"score":60 },
                { cn: '物化生三合一(一)', en: '' ,complete:true,"score":60 },
                { cn: '物化生三合一(二)', en: '' ,complete:true,"score":60 },
                { cn: '線性代數', en: 'Linear Algebra' ,complete:true},
                { cn: '編譯器設計概論', en: 'Intro. to Compiler Design' ,complete:true},
                { cn: '計算機概論與程式設計',
                    en: 'Introduction to Computers and Programming' ,complete:true},
                { cn: '計算機組織', en: 'Computer Organization' ,complete:true},
                { cn: '計算機網路概論', en: 'Intro. to Computer Networks' ,complete:true},
                { cn: '資料結構與物件導向程式設計',
                    en: 'Data Structures and Object-oriented Programming' ,complete:true},
                { cn: '資訊工程專題(一)',
                    en: 'Computer Science and Engineering Projects (I)' ,complete:true},
                { cn: '資訊工程專題(二)',
                    en: 'Computer Science and Engineering Projects (II)' ,complete:true},
                { cn: '資訊工程研討', en: 'Computer Science Seminars' ,complete:true},
                { cn: '離散數學', en: 'Discrete Mathematics' ,complete:true} ],
        notPas: [],
        complete: 'True' },
    { title: '通識',
        credit: 16,
        require: 20,
        course:
            [ { cn: '心理學概論', en: '', dimension: '群己', complete: true },
                { cn: '當代世界:環境危機與生態永續', en: '', dimension: '通識', complete: true },
                { cn: '幾何造形', en: '', dimension: '自然', complete: true },
                { cn: '經濟學概論', en: '', dimension: '歷史', complete: true },
                { cn: '霸權興衰史:從十五世紀至當代', en: '', dimension: '歷史', complete: true },
                { cn: '紀錄片製作概論', en: '', dimension: '歷史', complete: true },
                { cn: '台灣史', en: '', dimension: '歷史', complete: true },
                { cn: '當代中國：全球化下的兩岸關係', en: '', dimension: '歷史', complete: true } ] },
    { title: '副核心課程',
        credit: 16,
        require: 20,
        course:
            [ { cn: '心理學概論', en: '', dimension: '群己', complete: true },
                { cn: '當代世界:環境危機與生態永續', en: '', dimension: '通識', complete: true },
                { cn: '幾何造形', en: '', dimension: '自然', complete: true },
                { cn: '經濟學概論', en: '', dimension: '歷史', complete: true } ] },
    { title: '核心課程',
        credit: 16,
        require: 20,
        course:
            [ { cn: '心理學概論', en: '', dimension: '群己', complete: true },
                { cn: '當代世界:環境危機與生態永續', en: '', dimension: '通識', complete: true },
                { cn: '幾何造形', en: '', dimension: '自然', complete: true },
                { cn: '經濟學概論', en: '', dimension: '歷史', complete: true } ] },
    { title: '專業選修',
        credit: 16,
        require: 20,
        course:
            [ { cn: '心理學概論', en: '', dimension: '群己', complete: true },
                { cn: '當代世界:環境危機與生態永續', en: '', dimension: '通識', complete: true },
                { cn: '幾何造形', en: '', dimension: '自然', complete: true },
                { cn: '經濟學概論', en: '', dimension: '歷史', complete: true } ] },
    { title: '外文',
        credit: '20',
        require: '60',
        course:
            [ { cn: '作業系統概論', en: 'Introduction to Operating Systems' ,complete:true},
                { cn: '基礎程式設計', en: 'Basic Programming' ,complete:true},
                { cn: '微積分(一)', en: 'Calculus (I)' ,complete:true},
                { cn: '微積分(二)', en: 'Calculus (II)' ,complete:true},
                { cn: '微處理機系統實驗', en: 'Microprocessor System Lab.' ,complete:true},
                { cn: '數位電路設計', en: 'Digital Circuit Design' ,complete:true},
                { cn: '機率', en: 'Probability' },
                { cn: '正規語言概論', en: 'Introduction to Formal Language' ,complete:true},
                { cn: '演算法概論', en: 'Introduction to Algorithms' ,complete:true},
                { cn: '物化生三合一(一)', en: '' ,complete:true},
                { cn: '物化生三合一(二)', en: '' ,complete:true},
                { cn: '線性代數', en: 'Linear Algebra' ,complete:true},
                { cn: '編譯器設計概論', en: 'Intro. to Compiler Design' ,complete:true},
                { cn: '計算機概論與程式設計',
                    en: 'Introduction to Computers and Programming' ,complete:true},
                { cn: '計算機組織', en: 'Computer Organization' ,complete:true},
                { cn: '計算機網路概論', en: 'Intro. to Computer Networks' ,complete:true},
                { cn: '資料結構與物件導向程式設計',
                    en: 'Data Structures and Object-oriented Programming' ,complete:true},
                { cn: '資訊工程專題(一)',
                    en: 'Computer Science and Engineering Projects (I)' ,complete:true},
                { cn: '資訊工程專題(二)',
                    en: 'Computer Science and Engineering Projects (II)' ,complete:true},
                { cn: '資訊工程研討', en: 'Computer Science Seminars' ,complete:true},
                { cn: '離散數學', en: 'Discrete Mathematics' ,complete:true} ],
        notPas: [],
        complete: 'True' },{},{},{},{},{"total":115,"total_require":156,"compulsory":55,"compulse_require":58,"core":1,"core_require":"9","vice":9,"vice_require":"9","pro":9,"pro_require":"12","english":0,"english_require":1,"other":0,"other_require":"12","general":20,"general_require":20,"pe":6,"pe_require":6,"language":10,"language_require":8,"service":2,"service_require":2,"art":2,"art_require":2}

];
const studentCos = [{"cos_cname":"化學(一)","grade":"1","semester":"1","suggest":null,"pre":null},{"cos_cname":"微積分甲(一)","grade":"1","semester":"1","suggest":null,"pre":null},{"cos_cname":"普通生物(一)","grade":"1","semester":"1","suggest":null,"pre":null},{"cos_cname":"物理(一)","grade":"1","semester":"1","suggest":null,"pre":null},{"cos_cname":"線性代數","grade":"1","semester":"1","suggest":null,"pre":null},{"cos_cname":"計算機概論與程式設計","grade":"1","semester":"1","suggest":null,"pre":null},{"cos_cname":"化學(二)","grade":"1","semester":"2","suggest":"化學(一)","pre":null},{"cos_cname":"微積分甲(二)","grade":"1","semester":"2","suggest":"微積分甲(一) ","pre":null},{"cos_cname":"微積分甲(二)","grade":"1","semester":"2","suggest":"線性代數","pre":null},{"cos_cname":"數位電路設計","grade":"1","semester":"2","suggest":"計算機概論與程式設計","pre":null},{"cos_cname":"普通生物(二)","grade":"1","semester":"2","suggest":null,"pre":null},{"cos_cname":"物件導向程式設計","grade":"1","semester":"2","suggest":"計算機概論與程式設計","pre":null},{"cos_cname":"物理(二)","grade":"1","semester":"2","suggest":"物理(一)","pre":null},{"cos_cname":"離散數學","grade":"1","semester":"2","suggest":null,"pre":null},{"cos_cname":"數位電路實驗","grade":"2","semester":"1","suggest":"數位電路設計","pre":null},{"cos_cname":"機率","grade":"2","semester":"1","suggest":"微積分甲(二)","pre":null},{"cos_cname":"計算機網路概論","grade":"2","semester":"1","suggest":"計算機概論與程式設計","pre":null},{"cos_cname":"資料結構","grade":"2","semester":"1","suggest":"離散數學","pre":"物件導向程式設計"},{"cos_cname":"基礎程式設計(檢定考試)","grade":"2","semester":"2","suggest":"資料結構","pre":null},{"cos_cname":"正規語言概論","grade":"2","semester":"2","suggest":"離散數學","pre":null},{"cos_cname":"演算法概論","grade":"2","semester":"2","suggest":null,"pre":"資料結構"},{"cos_cname":"計算機組織","grade":"2","semester":"2","suggest":"數位電路實驗","pre":null},{"cos_cname":"作業系統概論","grade":"3","semester":"1","suggest":"計算機概論與程式設計","pre":null},{"cos_cname":"微處理機系統實驗","grade":"3","semester":"1","suggest":"計算機組織","pre":null},{"cos_cname":"編譯器設計概論","grade":"3","semester":"1","suggest":"正規語言概論","pre":"基礎程式設計(檢定考試)"},{"cos_cname":"資訊工程研討","grade":"3","semester":"1","suggest":"計算機概論與程式設計","pre":null},{"cos_cname":"資訊工程專題(一)","grade":"3","semester":"2","suggest":null,"pre":"基礎程式設計(檢定考試)"},{"cos_cname":"資訊工程專題(二)","grade":"4","semester":"1","suggest":null,"pre":"資訊工程專題(一)"}]
const studentPas = [{"cos_cname":"普通生物(一)(英文授課)","grade":"1","semester":"1","suggest":null,"pre":null},{"cos_cname":"物理(一)","grade":"1","semester":"1","suggest":null,"pre":null},{"cos_cname":"線性代數","grade":"1","semester":"1","suggest":null,"pre":null},{"cos_cname":"計算機概論與程式設計","grade":"1","semester":"1","suggest":null,"pre":null},{"cos_cname":"化學(二)","grade":"1","semester":"2","suggest":"化學(一)","pre":null},{"cos_cname":"微積分甲(二)","grade":"1","semester":"2","suggest":"微積分甲(一) ","pre":null},{"cos_cname":"微積分甲(二)","grade":"1","semester":"2","suggest":"線性代數","pre":null},{"cos_cname":"數位電路設計","grade":"1","semester":"2","suggest":"計算機概論與程式設計","pre":null},{"cos_cname":"普通生物(二)","grade":"1","semester":"2","suggest":null,"pre":null},{"cos_cname":"物件導向程式設計","grade":"1","semester":"2","suggest":"計算機概論與程式設計","pre":null},{"cos_cname":"物理(二)","grade":"1","semester":"2","suggest":"物理(一)","pre":null},{"cos_cname":"離散數學","grade":"1","semester":"2","suggest":null,"pre":null},{"cos_cname":"數位電路實驗","grade":"2","semester":"1","suggest":"數位電路設計","pre":null},{"cos_cname":"機率","grade":"2","semester":"1","suggest":"微積分甲(二)","pre":null},{"cos_cname":"計算機網路概論","grade":"2","semester":"1","suggest":"計算機概論與程式設計","pre":null},{"cos_cname":"資料結構","grade":"2","semester":"1","suggest":"離散數學","pre":"物件導向程式設計"},{"cos_cname":"基礎程式設計(檢定考試)","grade":"2","semester":"2","suggest":"資料結構","pre":null},{"cos_cname":"正規語言概論","grade":"2","semester":"2","suggest":"離散數學","pre":null},{"cos_cname":"演算法概論","grade":"2","semester":"2","suggest":null,"pre":"資料結構"},{"cos_cname":"計算機組織","grade":"2","semester":"2","suggest":"數位電路實驗","pre":null},{"cos_cname":"作業系統概論","grade":"3","semester":"1","suggest":"計算機概論與程式設計","pre":null},{"cos_cname":"微處理機系統實驗","grade":"3","semester":"1","suggest":"計算機組織","pre":null},{"cos_cname":"編譯器設計概論","grade":"3","semester":"1","suggest":"正規語言概論","pre":"基礎程式設計(檢定考試)"},{"cos_cname":"資訊工程研討","grade":"3","semester":"1","suggest":"計算機概論與程式設計","pre":null},{"cos_cname":"資訊工程專題(一)","grade":"3","semester":"2","suggest":null,"pre":"基礎程式設計(檢定考試)"},{"cos_cname":"資訊工程專題(二)","grade":"4","semester":"1","suggest":null,"pre":"資訊工程專題(一)"}]
const printData = [{"title":"共同必修","credit":45,"require":58,"course":[{"cn":"導師時間","en":"Mentor's Hours","score":null,"reason":"CS","complete":true,"grade":null,"realCredit":0,"originalCredit":0,"english":false,"year":1,"semester":1,"move":false},{"cn":"導師時間","en":"Mentor's Hours","score":null,"reason":"CS","complete":true,"grade":null,"realCredit":0,"originalCredit":0,"english":false,"year":1,"semester":2,"move":false},{"cn":"作業系統概論","en":"Introduction to Operating Systems","score":60,"code":"DCP4334","realCredit":3,"originalCredit":3,"complete":true,"grade":"C-","english":false,"year":3,"semester":1,"reason":"CS","move":false},{"cn":"基礎程式設計","en":"Basic Programming","score":75,"code":"DCP2106","realCredit":0,"originalCredit":0,"complete":true,"grade":"B","english":false,"year":2,"semester":2,"reason":"CS","move":false},{"cn":"微積分(一)","en":"Calculus (I)","score":87,"code":"DAM1355","realCredit":4,"originalCredit":4,"complete":true,"grade":"A","english":false,"year":1,"semester":1,"reason":"CS","move":false},{"cn":"微積分(二)","en":"Calculus (II)","score":62,"code":"DAM1356","realCredit":4,"originalCredit":4,"complete":true,"grade":"C-","english":false,"year":1,"semester":2,"reason":"CS","move":false},{"cn":"微處理機系統實驗","en":"Microprocessor System Lab.","score":-1,"code":"","realCredit":0,"originalCredit":0,"complete":false,"grade":"0","english":false,"year":"","semester":"","reason":"CS","move":false},{"cn":"數位電路實驗","en":"Digital Circuit Lab.","score":61,"code":"DCP2110","realCredit":2,"originalCredit":2,"complete":true,"grade":"C-","english":false,"year":3,"semester":1,"reason":"CS","move":false},{"cn":"數位電路設計","en":"Digital Circuit Design","score":69,"code":"DCP1157","realCredit":3,"originalCredit":3,"complete":true,"grade":"C+","english":false,"year":2,"semester":2,"reason":"CS","move":false},{"cn":"機率","en":"Probability","score":66,"code":"DCP1206","realCredit":3,"originalCredit":3,"complete":true,"grade":"C","english":true,"year":3,"semester":1,"reason":"CS","move":false},{"cn":"正規語言概論","en":"Introduction to Formal Language","score":60,"code":"DCP3122","realCredit":3,"originalCredit":3,"complete":true,"grade":"C-","english":true,"year":2,"semester":2,"reason":"CS","move":false},{"cn":"演算法概論","en":"Introduction to Algorithms","score":44,"code":"DCP3573","realCredit":3,"originalCredit":3,"complete":false,"grade":"E","english":false,"year":3,"semester":2,"reason":"CS","move":false},{"cn":"物件導向程式設計","en":"Object-Oriented Programming","score":60,"code":"DCP1159","realCredit":3,"originalCredit":3,"complete":true,"grade":"C-","english":false,"year":2,"semester":2,"reason":"CS","move":false},{"cn":"線性代數","en":"Linear Algebra","score":50,"code":"DCP2354","realCredit":3,"originalCredit":3,"complete":false,"grade":"D","english":false,"year":2,"semester":1,"reason":"CS","move":false},{"cn":"計算機概論與程式設計","en":"Introduction to Computers and Programming","score":62,"code":"DCP1203","realCredit":3,"originalCredit":3,"complete":true,"grade":"C-","english":false,"year":2,"semester":1,"reason":"CS","move":false},{"cn":"計算機組織","en":"Computer Organization","score":37,"code":"DCP3362","realCredit":3,"originalCredit":3,"complete":false,"grade":"E","english":false,"year":3,"semester":2,"reason":"CS","move":false},{"cn":"計算機網路概論","en":"Intro. to Computer Networks","score":66,"code":"DCP4513","realCredit":3,"originalCredit":3,"complete":true,"grade":"C","english":false,"year":3,"semester":1,"reason":"CS","move":false},{"cn":"資料結構","en":"Data Structures","score":60,"code":"DCP2332","realCredit":3,"originalCredit":3,"complete":true,"grade":"C-","english":false,"year":3,"semester":1,"reason":"CS","move":false},{"cn":"資訊工程專題(一)","en":"Computer Science and Engineering Projects (I)","score":85,"code":"DCP3103","realCredit":2,"originalCredit":2,"complete":true,"grade":"A","english":false,"year":3,"semester":2,"reason":"CS","move":false},{"cn":"資訊工程專題(二)","en":"Computer Science and Engineering Projects (II)","score":-1,"code":"","realCredit":0,"originalCredit":0,"complete":false,"grade":"0","english":false,"year":"","semester":"","reason":"CS","move":false},{"cn":"離散數學","en":"Discrete Mathematics","score":67,"code":"DCP2353","realCredit":3,"originalCredit":3,"complete":true,"grade":"C+","english":false,"year":2,"semester":2,"reason":"CS","move":false},{"cn":"化學(一)","en":"Chemistry (I)","score":"82","grade":"A-","realCredit":3,"originalCredit":3,"complete":true,"english":false,"year":1,"semester":1,"reason":"CS","move":false},{"cn":"物理(一)榮譽班","en":"Physics(I)","score":"82","grade":"A-","realCredit":3,"originalCredit":4,"complete":true,"english":false,"year":1,"semester":1,"reason":"CS","move":false}]},{"title":"核心課程","credit":9,"require":12,"selection":false,"course":[{"cn":"訊號與系統","en":"Signals and Systems","score":66,"code":"DCP1175","grade":"C","complete":true,"realCredit":3,"originalCredit":3,"english":false,"reason":"CS","year":2,"semester":2,"move":false},{"cn":"軟硬體協同設計概論與實作","en":"Introduction to Hardware-Software Codesign and Imp","score":null,"code":"DCP1225","grade":null,"complete":false,"realCredit":3,"originalCredit":3,"english":false,"reason":"CS","year":3,"semester":2,"move":false},{"cn":"電路與電子學(一)","en":"Electrical Circuits and Electronics (I)","score":60,"code":"DCP1229","grade":"C-","complete":true,"realCredit":3,"originalCredit":3,"english":false,"reason":"CS","year":3,"semester":1,"move":false},{"cn":"電路與電子學(二)","en":"Electrical Circuits and Electronics (II)","score":65,"code":"DCP1231","grade":"C","complete":true,"realCredit":3,"originalCredit":3,"english":false,"reason":"CS","year":3,"semester":2,"move":false}]},{"title":"副核心與他組核心","credit":3,"require":9,"selection":false,"course":[{"cn":"人工智慧概論","en":"Intro. to Artificial Intelligence","code":"","english":false,"score":-1,"grade":"0","complete":false,"realCredit":0,"originalCredit":0,"reason":"CS","year":"","semester":"","move":false},{"cn":"影像處理概論","en":"Introduction to Image Processing","code":"","english":false,"score":-1,"grade":"0","complete":false,"realCredit":0,"originalCredit":0,"reason":"CS","year":"","semester":"","move":false},{"cn":"網路程式設計概論","en":"Intro. to Network Programming","code":"","english":false,"score":-1,"grade":"0","complete":false,"realCredit":0,"originalCredit":0,"reason":"CS","year":"","semester":"","move":false},{"cn":"網路通訊原理","en":"Principles of communications networks","code":"","english":false,"score":-1,"grade":"0","complete":false,"realCredit":0,"originalCredit":0,"reason":"CS","year":"","semester":"","move":false},{"cn":"計算機圖學概論","en":"Introduction to Computer Graphics","code":"DCP4516","english":false,"score":68,"grade":"C+","complete":true,"realCredit":3,"originalCredit":3,"reason":"CS","year":3,"semester":1,"move":false},{"cn":"資料庫系統概論","en":"Introduction to Database Systems","code":"","english":false,"score":-1,"grade":"0","complete":false,"realCredit":0,"originalCredit":0,"reason":"CS","year":"","semester":"","move":false},{"cn":"嵌入式系統設計概論與實作","en":"Introduction to Embedded Systems Design and Implem","code":"","english":false,"score":-1,"grade":"0","complete":false,"realCredit":0,"originalCredit":0,"reason":"CS","year":"","semester":"","move":false},{"cn":"微分方程","en":"Differential Equation","code":"","english":false,"score":-1,"grade":"0","complete":false,"realCredit":0,"originalCredit":0,"reason":"CS","year":"","semester":"","move":false},{"cn":"數位系統設計","en":"Digital Systems Design","code":"","english":false,"score":-1,"grade":"0","complete":false,"realCredit":0,"originalCredit":0,"reason":"CS","year":"","semester":"","move":false},{"cn":"編譯器設計概論","en":"Intro. to Compiler Design","code":"","english":false,"score":-1,"grade":"0","complete":false,"realCredit":0,"originalCredit":0,"reason":"CS","year":"","semester":"","move":false}]},{"title":"專業選修","credit":5,"require":12,"course":[{"cn":"物理(一)榮譽班","en":"Physics(I)","score":"82","grade":"A-","realCredit":3,"originalCredit":4,"complete":true,"english":false,"year":1,"semester":1,"reason":"CS","move":false},{"cn":"物理(二)榮譽班","en":"Physics(II)","score":"87","grade":"A","realCredit":4,"originalCredit":4,"complete":true,"english":false,"year":1,"semester":2,"reason":"CS","move":true}]},{"title":"其他選修","credit":32,"require":9,"course":[{"cn":"","en":"","score":"","reason":"CS","complete":true,"grade":"A+","realCredit":"","originalCredit":"","english":false,"year":1,"semester":1,"move":false},{"cn":"","en":"","score":"","reason":"CS","complete":true,"grade":"A","realCredit":"","originalCredit":"","english":false,"year":1,"semester":1,"move":false},{"cn":"","en":"","score":"","reason":"CS","complete":true,"grade":"A-","realCredit":"","originalCredit":"","english":false,"year":1,"semester":1,"move":false},{"cn":"","en":"","score":"","reason":"CS","complete":true,"grade":"A","realCredit":"","originalCredit":"","english":false,"year":1,"semester":1,"move":false},{"cn":"","en":"","score":"","reason":"CS","complete":true,"grade":"A","realCredit":"","originalCredit":"","english":false,"year":1,"semester":1,"move":false},{"cn":"","en":"","score":"","reason":"CS","complete":true,"grade":"A-","realCredit":"","originalCredit":"","english":false,"year":1,"semester":1,"move":false},{"cn":"","en":"","score":"","reason":"CS","complete":true,"grade":"A","realCredit":"","originalCredit":"","english":false,"year":1,"semester":1,"move":false},{"cn":"","en":"","score":"","reason":"CS","complete":true,"grade":"A+","realCredit":"","originalCredit":"","english":false,"year":1,"semester":2,"move":false},{"cn":"","en":"","score":"","reason":"CS","complete":true,"grade":"A","realCredit":"","originalCredit":"","english":false,"year":1,"semester":2,"move":false},{"cn":"","en":"","score":"","reason":"CS","complete":true,"grade":"A","realCredit":"","originalCredit":"","english":false,"year":1,"semester":2,"move":false},{"cn":"","en":"","score":"","reason":"CS","complete":true,"grade":"B-","realCredit":"","originalCredit":"","english":false,"year":1,"semester":2,"move":false},{"cn":"","en":"","score":"","reason":"CS","complete":true,"grade":"A+","realCredit":"","originalCredit":"","english":false,"year":1,"semester":2,"move":false},{"cn":"","en":"","score":"","reason":"CS","complete":true,"grade":"A","realCredit":"","originalCredit":"","english":false,"year":1,"semester":2,"move":false},{"cn":"","en":"","score":"","reason":"CS","complete":true,"grade":"A","realCredit":"","originalCredit":"","english":false,"year":2,"semester":1,"move":false},{"cn":"","en":"","score":"","reason":"CS","complete":true,"grade":"B","realCredit":"","originalCredit":"","english":false,"year":3,"semester":1,"move":true},{"cn":"","en":"","score":"","reason":"CS","complete":true,"grade":"B-","realCredit":"","originalCredit":"","english":false,"year":3,"semester":2,"move":true}]},{"title":"外語","credit":8,"require":8,"course":[{"cn":"大一英文（一）","en":"Freshman English (I)","score":"73","reason":"CS","complete":true,"grade":"B","realCredit":2,"originalCredit":2,"english":false,"year":1,"semester":1,"move":false},{"cn":"大一英文（二）","en":"Freshman English (II)","score":"84","reason":"CS","complete":true,"grade":"A-","realCredit":2,"originalCredit":2,"english":false,"year":1,"semester":2,"move":false},{"cn":"德文（一）","en":"German (I)","score":"88","reason":"CS","complete":true,"grade":"A","realCredit":2,"originalCredit":2,"english":false,"year":2,"semester":1,"move":false},{"cn":"德文（二）","en":"German(II)","score":"76","reason":"CS","complete":true,"grade":"B","realCredit":2,"originalCredit":2,"english":false,"year":2,"semester":2,"move":false}]},{"title":"通識","credit":12,"require":20,"course":[{"cn":"法學緒論","en":"Introduction to Laws","score":"81","reason":"CS","complete":true,"grade":"A-","realCredit":2,"originalCredit":2,"english":false,"year":1,"semester":1,"move":false,"dimension":"公民"},{"cn":"中國與東亞文明史","en":"A General Survey of China and East Asia's Civiliza","score":"60","reason":"CS","complete":true,"grade":"C-","realCredit":2,"originalCredit":2,"english":false,"year":1,"semester":2,"move":false,"dimension":"歷史"},{"cn":"海洋環境與生態保育-MOOCs","en":"The Marine Environment and Ecological Conservation","score":"83","reason":"CS","complete":true,"grade":"A-","realCredit":2,"originalCredit":2,"english":false,"year":2,"semester":1,"move":false,"dimension":"自然"},{"cn":"經濟學概論","en":"Introduction to Economics","score":"70","reason":"CS","complete":true,"grade":"B-","realCredit":2,"originalCredit":2,"english":false,"year":2,"semester":2,"move":false,"dimension":"公民"},{"cn":"愛情與婚姻-從古典到現代","en":"Love and Marriage--from Ancient  to Modern","score":"60","reason":"CS","complete":true,"grade":"C-","realCredit":2,"originalCredit":2,"english":false,"year":2,"semester":2,"move":false,"dimension":"文化"},{"cn":"資訊與法律","en":"Information and Law","score":"80","reason":"CS","complete":true,"grade":"A-","realCredit":2,"originalCredit":2,"english":false,"year":3,"semester":2,"move":false,"dimension":"公民"}]},{"title":"體育","credit":0,"require":6,"course":[{"cn":"大一體育","en":"Physical Education","score":"80","reason":"CS","complete":true,"grade":"A-","realCredit":0,"originalCredit":0,"english":false,"year":1,"semester":1,"move":false},{"cn":"大一體育","en":"Physical Education","score":"72","reason":"CS","complete":true,"grade":"B-","realCredit":0,"originalCredit":0,"english":false,"year":1,"semester":2,"move":false},{"cn":"體育－籃球甲A","en":"Physical Education","score":"83","reason":"CS","complete":true,"grade":"A-","realCredit":0,"originalCredit":0,"english":false,"year":2,"semester":1,"move":false},{"cn":"體育－籃球乙","en":"Physical Education","score":"86","reason":"CS","complete":true,"grade":"A","realCredit":0,"originalCredit":0,"english":false,"year":2,"semester":2,"move":false},{"cn":"體育－有氧舞蹈","en":"Physical Eduaction","score":"72","reason":"CS","complete":true,"grade":"B-","realCredit":0,"originalCredit":0,"english":false,"year":3,"semester":2,"move":false}]},{"title":"服務學習","credit":1,"require":2,"course":[{"cn":"服務學習(一)","en":"Service Learning I","score":null,"reason":"CS","complete":true,"grade":null,"realCredit":0,"originalCredit":0,"english":false,"year":1,"semester":2,"move":false},{"cn":"動物與我-服務學習二","en":"Service Learning II","score":"89","reason":"CS","complete":true,"grade":"A","realCredit":1,"originalCredit":1,"english":false,"year":2,"semester":1,"move":false}]},{"title":"藝文賞析","credit":0,"require":2,"course":[{"cn":"藝文賞析教育","en":"Arts Appreciation Education","score":null,"reason":"CS","complete":true,"grade":null,"realCredit":0,"originalCredit":0,"english":false,"year":1,"semester":1,"move":false},{"cn":"藝文賞析教育","en":"Arts Appreciation Education","score":null,"reason":"CS","complete":true,"grade":null,"realCredit":0,"originalCredit":0,"english":false,"year":1,"semester":2,"move":false}]}];

class Head extends Component {


    state = {
        selectedIndex: 0,
        styleButton: {
            fontFamily: 'Noto Sans CJK TC',
            background: '#EEEEEE',
            lineHeight: '15px',
            margin: '5px 0 0',
            fontSize: '11px',
            width: '10px',
        },
		studentIdcard:{
       		name:'流川楓',
			prog:'網多',
			grad:'大一',
		},
        print_courseCategoryArray:printData

    };


    componentWillMount(){
    	let _this = this;

        axios.get('/students/graduate/original').then(studentData => {
            Graduationitems = studentData.data;
        }).catch(err => {
            console.log(err);
        });
        axios.get('/students/graduate/revised').then(studentData => {
            revise = studentData.data;
        }).catch(err => {
            console.log(err);
        });

        axios.get('/students/profile').then(studentData => {
            _this.setState({
                studentIdcard: {
                    name: studentData.data[0].sname,
                    prog: studentData.data[0].program ,
                    grad: "大" + studentData.data[0].grade,
                }
            })
        }).catch(err => {
            console.log(err);
        });
        MapCourseData = Object.keys(studentCos).map(function(key) {
            let user = studentCos[key];
            user.id = key;
            return user;
        });
        StudentCosPas = Object.keys(studentPas).map(function(key) {
            let user = studentPas[key];
            user.id = key;
            return user;
        });
        axios.get('/students/courseMap').then(studentData => {
                MapCourseData = Object.keys(studentData.data).map(function(key) {
                    let user = studentData.data[key];
                    user.id = key;
                    return user;
                });
        }).catch(err => {
            console.log(err);
        });
        axios.get('/students/coursePass').then(studentData => {
            // studentData.status HTTP response code (e.g., 200, 401)
            // studentData.data object parsed from HTTP response body
            // studentData.headers  HTTP presonse headers

            StudentCosPas = Object.keys(studentData.data).map(function(key) {
                let user = studentData.data[key];
                user.id = key;
                return user;
            });

        }).catch(err => {
            console.log(err);
        });


    }

    componentDidMount(){
    	this.select(0);

        axios.get('/students/graduate/print').then(function(resp){
            this.setState({
                print_courseCategoryArray: resp.data
            });
        }.bind(this)).catch(err => {
            console.log(err);
        });

    }

  	select(index){
            if(index===0){
                ReactDOM.render(
                    <FadeIn>
                        <HomeItem />
                    </FadeIn>,
                    document.getElementById('page'));
            }
            else if(index===1){
                ReactDOM.render(
					<div>
						<FadeIn>
							<MapItem
								studentPasdata={StudentCosPas}
								data={MapCourseData}
								studentId={this.state.studentIdcard.prog}
								studentsGrad={this.state.studentIdcard.grad}/>
						</FadeIn>
					</div>,
                    document.getElementById('page'));
            }
            else if(index===2){
                ReactDOM.render(
                    <font>
                        <FadeIn>
                            <GraduationItem
                                studentId={this.state.studentIdcard.prog}
                                items={Graduationitems}
                                result={Graduationitems[10]}
                                revise={revise}
                                reviseresult={revise[10]}
                                courseCategoryArray={this.state.print_courseCategoryArray}/>
                        </FadeIn>
                    </font>,
                    document.getElementById('page'));
            }
            else if(index===3){
                ReactDOM.render(
					<a>
						<FadeIn>
							<MapItem />
						</FadeIn>
					</a>,
                    document.getElementById('page'));
            }

  		this.setState({selectedIndex: index});
  	}
    
	render() {
	    return (
		    <div id="Head">
				<div id="ontopDiv">
					<div className="Head-header" >
							<div id="rectangle1"> </div>
							<div id="h1">交大資工線上助理</div>
							<div id="h2">NCTU Curriculum Assistant</div>
						<div id="adjust">
						<MuiThemeProvider zDepth={1}>
							<BottomNavigation selectedIndex={this.state.selectedIndex}>
							  <BottomNavigationItem
								label="首頁"
								icon={homeIcon}
								style={this.state.styleButton}
								onTouchTap={() => this.select(0)}
							  />
							  <BottomNavigationItem
								label="課程地圖"
								icon={mapIcon}
								style={this.state.styleButton}
								onTouchTap={() => this.select(1)}
							  />
							  <BottomNavigationItem
								label="畢業預審"
								icon={graduationIcon}
								style={this.state.styleButton}
								onTouchTap={() => this.select(2)}
							  />
							  <BottomNavigationItem
								label="抵免"
								icon={checkIcon}
								style={this.state.styleButton}
								onTouchTap={() => this.select(3)}
							  />
							</BottomNavigation>
						</MuiThemeProvider>
						</div>
						<div className="idcard">
							<div id="idcard-data">
								<div id="idcard-photo">
									<img src={defalt} width="44px" alt=""/>
								</div>
								<div id="idcard-top">
                                    {this.state.studentIdcard.name}
								</div>
								<div id="idcard-buttom">
                                    {this.state.studentIdcard.prog}{this.state.studentIdcard.grad}
								</div>
							</div>
						</div>
						<div id="logout-button">
							<MuiThemeProvider>
								<RaisedButton style={{
                                    width: '13%',
                                    fontFamily: 'Noto Sans CJK TC',
                                }}  backgroundColor = "#DDDDDD" label="Logout" href="/logout"/>
							</MuiThemeProvider>
						</div>
					</div>
				</div>
				<div id="topRec">
				</div>

				<div id="page" > </div>
				<footer>Copyright @2017 NCTUCS 交通大學資訊工程學系</footer>
	  		</div>
	    );
	  }
}

export default Head;
