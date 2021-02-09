import './HomePage.css';
import { Link } from 'react-router-dom';
import MyProgress from "../../Components/MyProgress/MyProgress";
import LessonsArray from "../../lessons.json";

function HomePage(){
    const hasCurrentUserBeenHereBefore = getUser() !== null;

    return(
        <div>
            {
                hasCurrentUserBeenHereBefore && <MyProgress name="My Progress" value={getCurrentProgress()} />
            }
            <h1>THE CODE'S PATH</h1>
            <p>JavaScript is the most popular programming language nowdays...</p>
            <p>
                If you are trying to learn JavaScript and have fun at the same time you are in the right place.
                You have chosen The Code's Path to be your mentor in this journey and it will not
                dissapoint you.
                Read some JavaScript topics and put them on practice completing some tasks that will help you deepen your
                just aqcuired knowledge.
                Prove yourself what you are capable of!
            </p>
            <Link to="/lessons">{ hasCurrentUserBeenHereBefore ? "Continue Learning..." : "LET'S DO THIS!"}</Link>
        </div>
    )
}
function getUser() {
    return JSON.parse(sessionStorage.getItem("user"));
}
function getCurrentProgress() {
    const user = getUser();
    const completedLessons = user && user.completedLessons ? user.completedLessons : [];
    return completedLessons.length > 0 ? (completedLessons.length / LessonsArray.length) * 100 : 0;
}

export default HomePage;
