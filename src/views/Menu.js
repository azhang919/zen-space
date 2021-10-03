import { Button, makeStyles, Paper, Tab, Tabs } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

const Menu = (props) => {

    const classes = useStyles();
    const { tabIndex, setTabIndex, handleLogout } = props;

    const handleTabChange = (e, newValue) => {
        e.preventDefault();
        if (tabIndex !== newValue) {
            setTabIndex(newValue);
        }
    }

    return (
        <section>
            <nav>
                <Paper className={classes.root}>
                    <div className="header">
                        <div className="title">HELLO WORLD</div>
                        <Button onClick={handleLogout}>Log out</Button>
                    </div>
                    <Tabs
                        value={tabIndex}
                        onChange={handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="HOME" />
                        <Tab label="WORK" />
                        <Tab label="PLAY" />
                    </Tabs>
                </Paper>
            </nav>
        </section>
    );
};

export default Menu;
