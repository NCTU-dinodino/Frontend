import React, { Component } from 'react'
import { Avatar, Paper } from 'material-ui'
import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
    root: {
        margin: '3px',
        padding: '3px',
        width:'100%'
    },
    avatar: {
        backgroundColor: 'white'
    },
    message: {
        backgroundColor: 'white',
        maxWidth: '75%',
        minWidth: '100px',
        margin: '10px',
        padding: '5px',
        wordWrap: 'break-word',
    },
    name: {
        width: '100%',
        wordWrap: 'break-word',
        textAlign: 'center',
        fontSize: 10,
    }
})

const Message = (props) => {
    const { classes, message, avatar, isSender, name } = props
    return (
        <Grid
            container
            direction={isSender ? "row-reverse" : "row"}
            justify="flex-start"
            alignItems="center"
            className={classes.root}
        >
            <div>
                <Avatar
                    src={avatar}
                    className={classes.avatar} />
                <div className={classes.name}>
                    {name}
                </div>
            </div>

            <Paper
                className={classes.message}
                style={{ fontFamily: 'Noto Sans CJK TC'}}
            >

                {message.split('\n').map(function (item, key) {
                    return (
                        <span key={key}>
                            {item}
                            < br />
                        </span>
                    )
                })}
            </Paper>
        </Grid>
    )
}

export default withStyles(styles)(Message)
