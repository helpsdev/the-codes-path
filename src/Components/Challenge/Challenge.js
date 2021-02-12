import './Challenge.css';
import { useState } from "react";
import { useParams } from "react-router-dom";
import LessonsArray from "../../lessons.json";
import AceEditor from "react-ace";
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import Prism from "prismjs";
import 'prismjs/themes/prism.css';

function Challenge() {
    const { lessonId } = useParams();
    const [aceEditorValue, setAceEditorValue] = useState(null);
    const [testResults, setTestResults] = useState([]);
    
    return (
        <div className="challenge">
            <section className="code-arena">
                <AceEditor className="coding-area" mode="javascript" 
                    theme="monokai" width="100%" 
                    fontSize={14} onChange={setAceEditorValue}
                />
                <section className="console" data-console>{
                    testResults.map(tr => <p>{tr.description} -&gt; {tr.result ? "passed" : "not passed"}</p>)
                }</section>
            </section>
            <section className="explanation">
                {getLessonExplanation(lessonId)}
                <button type="button" onClick={runTests.bind(this, aceEditorValue, lessonId, setTestResults)}>Run Tests</button>
            </section>
        </div>
    )
}
function createRunner(currentCode) {
    const objectNameRegex = /var (\w+)/g;
    const objectName = objectNameRegex.exec(currentCode)[1];
    const wrapper = `return function(){ 
        ${currentCode}
        return ${objectName};
    };`
    return new Function(wrapper);
    
}
function runTests(currentCode, lessonId, setTestResults){
    const result = createRunner(currentCode)()();
    const { tests } = getLessonByLessonId(lessonId);
    
    setTestResults(tests.map(t => {
        
        const testFunc = new Function(t.code);
        
        t.result = testFunc()(result);
        
        return t;

    }));

}
function getLessonByLessonId(lessonId) {
    return LessonsArray.find(l => l.id === Number(lessonId));
}

function getLessonExplanation(lessonId){
    const { name, explanation: { description, examples }, challenge } = getLessonByLessonId(lessonId);

    return (
        <div>
            <h1>{name.toUpperCase()}</h1>
            {description.split("[BR]").map((p, index) => {
                
                for (const key in examples) {
                    if (Object.hasOwnProperty.call(examples, key)) {
                        const regex = new RegExp(`\\[${key}\\]`);
                        if (regex.test(p)) {
                            
                            const prismsified = Prism.highlight(examples[key], Prism.languages.javascript, 'javascript');
                            return (
                                <pre key={index.toString()} className="language-js">
                                    <code key={index.toString()} dangerouslySetInnerHTML={{__html: p.replace(regex, prismsified)}}></code>
                                </pre>
                            );
                        }
                    }
                }

                return <p key={index.toString()}>{p}</p>;
            })}
            {challenge.split("[BR]").map(p => <p>{p}</p>)}
        </div>
    );
    
}

export default Challenge;