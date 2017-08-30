import React from 'react'
import VisibleTodoList from '../containers/VisibleTodoList'
import Button from './Button'

import ReactHover from 'react-hover';

const optionsCursorTrueWithMargin = {
    followCursor: true,
    shiftX: 20,
    shiftY: 0
};

class App extends React.Component{

    constructor(props) {
        super(props);
    }
    render(){
            return(
                <div>
                    <ReactHover
                        options={optionsCursorTrueWithMargin}>
                        <ReactHover.Trigger>
                            <h1 style={{background: '#abbcf1', width: '200px'}}> Hover on me </h1>
                        </ReactHover.Trigger>
                        <ReactHover.Hover>
                            <h1> I am hover HTML </h1>
                        </ReactHover.Hover>
                    </ReactHover>
                <div className="grades">
                    <div className="grade" id="grade-1">
                        <div className="grade-num"><h3>大一(104)</h3></div>
                        <div className="session">
                            <div  className="up-session">
                                <VisibleTodoList grad="1" sem="1"/>
                            </div>
                            <div className="down-session">
                                <VisibleTodoList grad="1" sem="2"/>
                            </div>
                        </div>
                    </div>


                    <div className="grade" id="grade-2">
                        <div className="grade-num"><h3>大二(105)</h3></div>
                        <div className="session">
                            <div className="up-session">
                                <VisibleTodoList grad="2" sem="1"/>

                            </div>
                            <div className="down-session">
                                <VisibleTodoList grad="2" sem="2"/>

                            </div>
                        </div>
                    </div>


                    <div className="grade grade-cur" id="grade-3">
                        <div className="grade-num"><h3>大三(106)</h3></div>
                        <div className="session">
                            <div className="up-session session-cur">
                                <VisibleTodoList grad="3" sem="1"/>
                            </div>
                            <div className="down-session">
                                <VisibleTodoList grad="3" sem="2"/>
                            </div>
                        </div>
                    </div>


                    <div className="grade" id="grade-4">
                        <div className="grade-num"><h3>大四(107)</h3></div>
                        <div className="session">
                            <div className="up-session">
                                <VisibleTodoList grad="4" sem="1"/>
                            </div>
                            <div className="down-session">
                                <VisibleTodoList grad="4" sem="2"/>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="mods"><Button/></div>
            </div>
        )
    }
}
export default App