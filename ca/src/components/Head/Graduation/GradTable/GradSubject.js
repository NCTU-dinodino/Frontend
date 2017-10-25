import React from 'react'
import './GradSubject.css'

let realscore = [null, null, null, null, null, null, null, null]

class GradSubject extends React.Component {
    state = {
        name: this.props.name,
        credit: this.props.credit,
        semester: this.props.semester,
        year: this.props.year,
        comment: ''
    };

    componentWillMount(){
        realscore[(this.state.year-103)*2 + this.state.semester] = this.props.score;
    }

    render(){
        return (
            <tr>
                <td className="cell-text left-text">{this.state.name}</td>
                <td className="cell-text">{realscore[0]}</td>
                <td className="cell-text">{realscore[1]}</td>
                <td className="cell-text">{realscore[2]}</td>
                <td className="cell-text">{realscore[3]}</td>
                <td className="cell-text">{realscore[4]}</td>
                <td className="cell-text">{realscore[5]}</td>
                <td className="cell-text">{realscore[6]}</td>
                <td className="cell-text">{realscore[7]}</td>
                <td className="cell-text">{this.state.credit}</td>
                <td className="cell-text"></td>
                <td className="cell-text">{this.state.comment}</td>
            </tr>
        );
    }
}

export default GradSubject;