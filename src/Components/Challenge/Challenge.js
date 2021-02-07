import './Challenge.css';
import { useParams } from "react-router-dom";
import LessonsArray from "../../lessons.json";

function Challenge() {
    const { lessonId } = useParams();
    const currentLesson = getLessonByLessonId(lessonId);
    return (
        <div className="challenge">
            <section className="code-arena">
                <section className="coding-area"></section>
                <section className="console">This is test</section>
            </section>
            <section className="explanation">
                <p>{currentLesson.explanation}</p>
                <button type="button">Run Tests</button>
            </section>
        </div>
    )
}

function getLessonByLessonId(lessonId) {
    return LessonsArray.find(l => l.id === Number(lessonId));
}

export default Challenge;