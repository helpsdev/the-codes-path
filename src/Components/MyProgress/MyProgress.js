import './MyProgress.css';

function MyProgress(props){
    const dynamicProgressId = getDynamicId();

    return (
        <div>
            <label for={dynamicProgressId}>{props.name}: </label>
            <progress id={dynamicProgressId} max="100" value={props.value}>{props.value}%</progress>
        </div>
    );
}

function getDynamicId() {
    return Math.floor(Math.random() * 1000);
}
export default MyProgress;