import './Lessons.css';
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import LessonsArray from '../../lessons.json';

function Lessons(){
    const { path } = useRouteMatch();
    return(
        <div>
            <Switch>
                <Route exact path={path}>
                    {getLessons().map(l => {
                        return (
                            <div>
                                <Link to={`/challenge/${l.id}`}>{l.name}</Link>
                            </div>
                        );
                    })}
                </Route>
            </Switch>
        </div>
    )
}

function getLessons() {
    return LessonsArray;
}

export default Lessons;