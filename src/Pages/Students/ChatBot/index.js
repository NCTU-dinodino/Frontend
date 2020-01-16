import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { withStyles, Paper, Button, Fade, Hidden } from '@material-ui/core';
import { withRouter } from 'react-router-dom'
import ChatIcon from '@material-ui/icons/Chat';
import Chatbot from './chatbot'


const styles = (theme) => (
    {
        root: {
            position: 'fixed',
            bottom: '50px',
            right: '7px',
            zIndex: 1500
        },
        fab: {
            float: 'right'
        },
        chatWindow: {
            backgroundColor: 'white',
            padding: '5px',
            color: '#7B7B7B',
            width: '350px',
            height: '500px',
            marginBottom: '10px',
        },
    }
)

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = { show: false }
        this.handleToggle = this.handleToggle.bind(this)
    }

    handleToggle() {
        this.setState({ show: !this.state.show })
    }

    render() {
        {
            const { classes, mobile } = this.props

            if (mobile) return (
                <div style={{ width: '100%', height: 'calc(100vh - 110px)' }}>
                    <Chatbot></Chatbot>
                </div>
            )
            else if (window.location.pathname != "/students/chatbot")
                return (
                    <div className={classes.root}>
                        <Fade in={this.state.show} timeout={500}>
                            <div>
                                <MuiThemeProvider>
                                    <Paper className={"container " + classes.chatWindow}>
                                        <Chatbot />
                                    </Paper>
                                </MuiThemeProvider>
                            </div>
                        </Fade>
                        <Hidden smUp>
                            <Button variant='extendedFab' className={classes.fab} href="/students/chatbot" >
                                <ChatIcon />
                            </Button>
                        </Hidden>
                        <Hidden only="xs">
                            <Button variant='extendedFab' className={classes.fab} onClick={() => this.handleToggle()}>
                                <ChatIcon />
                            </Button>
                        </Hidden>
                    </div>

                )
            return null;
        }
    }
}

export default withRouter(withStyles(styles)(Index))