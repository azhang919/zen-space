import { Button, Card, CardActions, CardContent } from '@material-ui/core';

const GameIntro = (props) => {

    return (
        <Card>
            <CardContent>
                <p>Trivia Game intro text placeholder</p>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={props.playGame}>Begin</Button>
            </CardActions>
        </Card>

    )

}

export default GameIntro;