import Clock from './Clock.js';
import Quote from './Quote.js';
import Weather from './Weather.js';

const Home = () => {

    return (
        <section className="home">
            <Time/>
            <Quote/>
            <Weather/>
        </section>
    )
}

export default Home;