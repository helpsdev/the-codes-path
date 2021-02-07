import './Challenge.css';
import { useState } from "react";
import { useParams } from "react-router-dom";
import LessonsArray from "../../lessons.json";
import AceEditor from "react-ace";
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';

function Challenge() {
    const { lessonId } = useParams();
    const currentLesson = getLessonByLessonId(lessonId);
    const [aceEditorValue, setAceEditorValue] = useState(null);
    
    return (
        <div className="challenge">
            <section className="code-arena">
                <AceEditor className="coding-area" mode="javascript" 
                    theme="monokai" width="100%" 
                    fontSize={14} onChange={setAceEditorValue}
                />
                <section className="console">{aceEditorValue}</section>
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