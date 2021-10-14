import { Card, CardContent } from '@material-ui/core';
import { useState, useEffect } from "react";

const Clock = () => {

    const [date, setDate] = useState(new Date());

    useEffect(() => {
        
        const dateInterval = setInterval(() => {
            setDate(new Date());
        }, 60000);

        return () => clearInterval(dateInterval);
    }, []);

    return (
        <Card>
            <CardContent>
                <p>{date.toString().slice(0, 15)}</p>
            </CardContent>
        </Card>
    )

}

export default Clock;