import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, CardActions, CardContent, TextField } from '@material-ui/core';

const Quote = () => {

    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    
    useEffect(() => {
        getQuote();
    }, []);

    const getQuote = async () => {
        const result = await axios({
            method: 'GET',
            url: 'https://api.quotable.io/random',
        });
        setQuote(result.data.content);
        setAuthor(result.data.author);
    }

    return (
        <Card>
            <CardContent>
                <p>{quote}</p>
                <p>- {author}</p>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={getQuote}>New Quote</Button>
            </CardActions>
        </Card>
    )
}

export default Quote;