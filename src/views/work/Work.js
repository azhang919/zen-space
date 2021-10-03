import { useState, useEffect } from 'react';
import TodoForm from './TodoForm.js';
import Todo from './Todo.js';
import { db } from '../../firebase.js';

const Work = (props) => {

    const [items, setItems] = useState([]);
    const uid = props.uid;

    useEffect(() => {
        db.collection('todos').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
            setItems(snapshot.docs.filter((doc) => doc.data().uid === uid).map((d) => d.data()));
        });
    }, []);

    /**
     * Validates duplicates and updates list when a new task is submitted
     * Returns boolean value to indicate success
     */
    const addItem = (task) => {
        if (duplicateExists(task)) {
            return false;
        }
        db.collection('todos').doc(task.id.toString()).set(task);
        return true;
    }

    /**
     * Checks a task against an existing list of tasks
     * @param {Object} task 
     * @returns true if a duplicate exists, false otherwise
     */
    const duplicateExists = (task) => {
        let lowercase = task.text.toLowerCase();
        for (let i = 0; i < items.length; i++) {
            if (items[i].text.toLowerCase() === lowercase) {
                return true;
            }
        }
        return false;
    }

    return (
        <section className="work">
            <TodoForm onSubmit={addItem} uid={props.uid}/>
            {items.map((t, i) => <Todo key={i} task={t} listItems={items} />)}
        </section>
    )
}

export default Work;