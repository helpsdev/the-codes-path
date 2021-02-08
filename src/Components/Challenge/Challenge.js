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
                <section className="console" data-console></section>
            </section>
            <section className="explanation">
                <p>{currentLesson.explanation}</p>
                <button type="button" onClick={runTests.bind(this, aceEditorValue)}>Run Tests</button>
            </section>
        </div>
    )
}
function createFunction(currentCode) {
    return new Function(currentCode);
}
function runTests(currentCode){
    const codeArenaConsole = document.querySelector("[data-console]");
    codeArenaConsole.innerHTML = createFunction(currentCode)();
}
function getLessonByLessonId(lessonId) {
    return LessonsArray.find(l => l.id === Number(lessonId));
}

export default Challenge;