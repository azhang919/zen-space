import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { styled } from "@material-ui/core/styles";
import { spacing } from "@material-ui/system";
import MuiButton from '@material-ui/core/Button';
import firebase from 'firebase';

// An edit form for creating a new task, to be added to the list
const TodoForm = (props) => {

    const [val, setVal] = useState("");
    const [message, setMessage] = useState("");
    const Button = styled(MuiButton)(spacing);

    /* Updates the UI text as a user types */
    const handleTextChange = (e) => {
        e.preventDefault();
        if (e.target.value.length > 70) {
            return;
        }
        setMessage((e.target.value.length === 70) ? "Maximum character limit reached.": "");
        setVal(e.target.value);
    }
    
    /* Validates and saves user text input and clears the field */
    const handleSubmitButton = (e) => {
        e.preventDefault();

        const newTask = {
            id: new Date().getTime(), // ensures unique ID
            uid: props.uid,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            text: val,
            done: false,
        }

        if (props.onSubmit(newTask)) {
            setVal("");
            setMessage("");
        } else {
            setMessage("Duplicate task detected (case-insensitive). Try again.");
        }
    }

    return (
        <form onSubmit={handleSubmitButton}>
            <TextField
                required
                style={{ margin: 15 }}
                placeholder="Text here..." 
                onChange={handleTextChange}
                name="todo-input"
                value={val}
                variant="outlined"
                color="secondary"
                ng-trim="false"
            />
            <Button
                variant="contained"
                color="primary"
                disabled={!val}
                disableElevation
                type="submit"
                mt={3}
            >+</Button>
            <p className="error-message">{message}</p>
            <br/>
        </form>
    );
}

export default TodoForm;