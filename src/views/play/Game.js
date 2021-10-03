import React, { useEffect, useState } from 'react';
import {
    Button,
    Card,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Radio,
    RadioGroup,
} from '@material-ui/core';
import axios from 'axios';
// import Intro from './Intro.js';

const Game = () => {

    // Pull 10 random questions from API

    /**
     * FIELDS
     * array of question objects (question, answer, qid)
     * array of player answers (qid, answer)
     * cumulative score
     * total possible score
     * 
     * 
     * DATABASE LEADERBOARD
     * player uid, score
     * sort by rank
     */

    // User to select answers

    // Calculate score based on answers

    // Display final score, replay option, leaderboard?
    const [quiz, setQuiz] = useState([]);
    const errors = ["true", "true", "true", "true", "true", "false", "false", "false", "false", "false"];

    const getQuiz = async () => {
        const result = await axios({
            method: 'GET',
            url: `https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple`,
        });
        const quizObj = result.data.results.map((item, i) => {
            return {
                id: i,
                question: decode(item.question),
                correct: decode(item.correct_answer),
                answers: formatAnswers(item.incorrect_answers, item.correct_answer),
            }
        })
        console.log(quizObj);

        setQuiz(quizObj);
    }
    
    const decode = (str) => {        
        str = str.replace(/&quot;|&#34;|&ldquo;|&rdquo;/g, `\"`);
        str = str.replace(/&#039;|&#39;|&lsquo;|&rsquo;/g, `\'`);
        return str.replace(/&#(\d+);/g, String.fromCharCode(str));
    }

    const formatAnswers = (incorrect, correct) => {
        const idx = Math.floor(Math.random() * 4);

        let answers = incorrect.map((q) => decode(q));
        answers.splice(idx, 0, decode(correct));
        console.log('FORMATTED ANSWERS');
        console.log(answers);
        return answers;
    }

    useEffect(() => {
        getQuiz();
    }, []);

    return (
        <div>
            <Card>
                <form>
                    {quiz.map((item, i) => (
                        <FormControl
                            key={i}
                            component="fieldset"
                            error={!!errors[i]}
                        >
                            <FormLabel component="legend">{item.question}</FormLabel>
                            <FormHelperText>
                                {errors[i] && 'Please select an option'}
                            </FormHelperText>
                            <RadioGroup>
                                {item.answers.map((a, i) => 
                                    <FormControlLabel
                                        key={i}
                                        value={a}
                                        control={<Radio />}
                                        label={a}
                                    />
                                )}
                            </RadioGroup>
                        </FormControl>
                    ))}
                    <Button color="primary">Submit</Button>
                </form>
            </Card>
        </div>
    )
}

export default Game;
