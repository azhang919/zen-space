import { useState } from 'react';
import { Button, Card, CardActions, CardContent, Checkbox, Dialog, DialogContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { db } from '../../firebase.js';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 550,
        height: 125,
        marginBottom: "1rem",
        border: "2px solid lavender",
        textAlign: "left",
    },
    content: {
        flex: "1 0 auto",
        display: "flex",
        alignItems: "center",
        paddingLeft: theme.spacing(1),
        borderBottom: "2px solid lavender",
    },
    actions: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(2),
        display: 'flex',
        alignItems: "flex-end",
        justifyContent: "space-between",
    },
    box: {
        paddingBottom: theme.spacing(1),
    },
    updateButton: {
        marginRight: theme.spacing(3),
    }
}));

// A single to-do item and its edit form
const Todo = (props) => {

    const [openPopup, setOpenPopup] = useState(false);  // for showing edit form popup
    const [val, setVal] = useState(props.task.text);    // for tracking input text
    const [message, setMessage] = useState("");         // for tracking error messages
    const classes = useStyles();

    const stringID = props.task.id.toString();

    /* Checkbox click handler */
    const handleCheckChange = (e) => {
        e.preventDefault();
        db.collection('todos').doc(stringID).set({ done: !props.task.done }, { merge: true });
    };

    /* Delete button click handler */
    const handleDeleteButton = (e) => {
        e.preventDefault();
        db.collection('todos').doc(stringID).delete();
    }

    /* Edit button click handler */
    const handleEditButton = (e) => {
        e.preventDefault();
        setOpenPopup(true);
    }

    /* Cancel button click handler */
    const handleCancelButton = (e) => {
        e.preventDefault();
        setOpenPopup(false);
        setMessage("");
        setVal(props.task.text);
    }

    /* Valid duplicates and updates the correct task */
    const handleUpdateButton = (e) => {
        e.preventDefault();

        const lowercase = val.toLowerCase();
        for (let i = 0; i < props.listItems.length; i++) {
            if (props.listItems[i].text.toLowerCase() === lowercase) {
              return false;
            }
        }
        
        setOpenPopup(false);
        setMessage("");
        db.collection('todos').doc(stringID).set({ text: val }, { merge: true });
    }

    /* Updates the UI text as a user types */
    const handleTextChange = (e) => {
        e.preventDefault();
        if (e.target.value.length > 70) {
            return;
        }
        setMessage( (e.target.value.length === 70) ? "Maximum character limit reached." : "");
        setVal(e.target.value);
    }

    return (
        <div className="todo-item">
            <Card className={classes.root} variant="outlined">
                <CardContent className={classes.content}>
                    <Checkbox
                        className="checkbox-item"
                        checked={props.task.done}
                        onClick={handleCheckChange}
                    />
                    <span>{props.task.text}</span>
                </CardContent>
                <CardActions className={classes.actions}>
                    <div>
                        <Button size="small" color="primary" onClick={handleEditButton}>EDIT</Button>
                        <Button size="small" color="secondary" onClick={handleDeleteButton}>DELETE</Button>
                    </div>
                </CardActions>
            </Card>
            <Dialog open={openPopup}>
                <DialogContent>
                    <form className="edit-form">
                        <input
                            value={(val !== undefined) ? val : props.task.text}
                            defaultValue={props.task.text}
                            onChange={handleTextChange}
                            name="todo-edit"
                            className="edit-input"
                            minLength="1"
                            maxLength="70"
                            ng-trim="false"
                        />
                        <p className="error-message">{message}</p>
                        <div className="edit-buttons">
                            <Button
                                variant="contained"
                                color="primary"
                                disableElevation
                                disabled={!val}
                                type="submit"
                                onClick={handleUpdateButton}
                                className={classes.updateButton}
                            >UPDATE</Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={handleCancelButton}
                            >CANCEL</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Todo;