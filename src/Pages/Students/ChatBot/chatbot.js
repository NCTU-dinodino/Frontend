import React, { Component } from 'react'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { withStyles, Input, Button, Grid } from '@material-ui/core';
import { sendMessage } from '../../../Redux/Students/Actions/ChatBot/index'
import defaultAvter from '../../../Resources/defalt.jpg'
import dinoAvter from '../../../Resources/dino.png'
import Message from './message'

const styles = (theme) => ({
    root: {
        padding: '5px',
        height: '100%'
    },
    messagebox: {
        overflowY: 'auto',
        overflowX: 'hidden',
        height: 'calc(100% - 80px)'
    },
    userInput: {
        marginBottom: '5px',
        border: '1px #7f8c8d solid',
        borderRadius: '5px',
        width: '100%',
        padding: '5px',
    }
})

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = { inputValue: '' }

        this.handleChange = this.handleChange.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
    }

    handleChange(e) {
        // console.log('change')
        if (e.target.value != '\n')
            this.setState({ inputValue: e.target.value });
    }

    handleKeyPress(e) {
        if (e.charCode == 13 && !e.shiftKey) {
            this.sendMessage()
        }
    }

    sendMessage() {
        if (this.state.inputValue != '') {
            this.props.sendMessage(
                this.state.inputValue
            )
            this.setState({ inputValue: '' });
        }

    }

    scrollToBottom = () => {
        // console.log(this.messagesEndRef)
        this.messagesEndRef.scrollIntoView();
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        let { messages, classes } = this.props
        let { inputValue } = this.state
        // console.log(inputValue.replace('\n', '\\n'))
        return (
            <MuiThemeProvider>
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    className={classes.root}
                >
                    <Grid item className={classes.messagebox}>
                        {messages.map(m => (
                            <Message {...m}
                                avatar={m.isSender ? defaultAvter : dinoAvter}
                                name={m.isSender ? this.props.studentIdcard.sname : '小助手'}
                            />
                        ))}
                        <div ref={el => { this.messagesEndRef = el }} />
                    </Grid>
                    <Grid item className={classes.userInput + ' input-group'}>
                        <Input
                            id="filled-multiline-static"
                            label="Multiline"
                            multiline
                            rows="4"
                            defaultValue="Default Value"
                            value={inputValue}
                            fullWidth
                            margin="normal"
                            disableUnderline
                            onChange={this.handleChange}
                            onKeyPress={this.handleKeyPress}
                            style={{ fontFamily: 'Noto Sans CJK TC' }}
                        />
                        <span className={'input-group-btn'}>
                            <Button
                                style={{ fontFamily: 'Noto Sans CJK TC' }}
                                variant="contained"
                                onClick={() => this.sendMessage()}>
                                送出
                            </Button>
                        </span>
                    </Grid>
                </Grid>
            </MuiThemeProvider>
        )
    }
}

const mapState = (state) => ({
    messages: state.Student.ChatBot.messages,
    studentIdcard: state.Student.User.studentIdcard,
})

const mapDispatch = (dispatch) => ({
    sendMessage: (message) => dispatch(sendMessage(message)),
})

export default connect(mapState, mapDispatch)(withStyles(styles)(Index))