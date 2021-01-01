import React, {useEffect} from 'react';
import styles from './App.module.css';

import {Grid} from "@material-ui/core";
import {
    makeStyles,
    createMuiTheme,
    MuiThemeProvider,
    Theme
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PolymerIcon from "@material-ui/icons/Polymer";

import {useSelector, useDispatch} from "react-redux";
import {
    selectLoginUser,
    selectProfiles,
    fetchAsyncGetProfs,
    fetchAsyncGetMyProf
} from "./features/auth/authSlice";

import {
    fetchAsyncGetTasks,
    fetchAsyncGetUsers,
    fetchAsyncGetCategory,
    selectTasks,
    selectEditedTask
} from "./features/task/taskSlice";

import TaskList from "./features/task/TaskList";
import TaskForm from "./features/task/TaskForm";
import TaskDisplay from "./features/task/TaskDisplay";
import {AppDispatch} from "./app/store";

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: "#3cb371",
        },
    },
});

const useStyles = makeStyles((theme: Theme) => ({
    icon: {
        marginTop: theme.spacing(3),
        cursor: "none",
    },
}));


const App: React.FC = () => {
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();
    const editedTask = useSelector(selectEditedTask)
    const tasks = useSelector(selectTasks)
    const loginUser = useSelector(selectLoginUser)
    const profiles = useSelector(selectProfiles)

    const loginProfile = profiles.filter((prof) => prof.user_profile === loginUser.id)[0]

    const logout = () => {
        localStorage.removeItem("localJWT")
        window.location.href = "/"
    }

    useEffect(() => {
        const fetchBootLoader = async () => {
            await dispatch(fetchAsyncGetTasks());
            await dispatch(fetchAsyncGetMyProf());
            await dispatch(fetchAsyncGetUsers());
            await dispatch(fetchAsyncGetCategory());
            await dispatch(fetchAsyncGetProfs());
        };
        fetchBootLoader();
    }, [dispatch]);

    return (
        <MuiThemeProvider theme={theme}>
            <div className={styles.app__root}>
                <Grid container>
                    <Grid item xs={4}>
                        <PolymerIcon className={classes.icon}/>
                    </Grid>
                    <Grid item xs={4}>
                        <h1>Scrum Task Board</h1>
                    </Grid>
                    <Grid item xs={4}>
                        <div className={styles.app__logout}>
                            <button className={styles.app__iconLogout} onClick={logout}>
                                <ExitToAppIcon fontSize="large"/>
                            </button>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <TaskList/>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid
                            container
                            direction="column"
                            alignItems="center"
                            justify="center"
                            style={{minHeight: "80vh"}}
                        >
                            <Grid item>
                                {editedTask.status ? <TaskForm/> : <TaskDisplay/>}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </MuiThemeProvider>
    );
};

export default App;
