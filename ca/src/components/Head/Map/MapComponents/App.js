import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

class App extends React.Component{
    constructor(props) {
        super(props);
        console.log(this.props.data);
    }

    render(){
        return(
            <div>
                <AddTodo data={this.props.data}/>
                <VisibleTodoList />
                <Footer />
            </div>
        )
    };
}

export default App