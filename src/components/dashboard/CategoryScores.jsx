import ProgressBar from "./ProgressBar"
// import ProgressBar from "@ramonak/react-progress-bar";

export default function CategoryScores(){
    return (
        <div className="tile category-scores">
            <ProgressBar className="progress" value={7} max={10} color="#4F3CC3">Comm.</ProgressBar>
            <ProgressBar className="progress" value={5} max={10} color="#C77C0B">Technical</ProgressBar>
            <ProgressBar className="progress" value={3} max={10} color="#D515C2">Problem Solving</ProgressBar>
            <ProgressBar className="progress" value={6} max={10} color="#15B2D5">Behavioral</ProgressBar>
        </div>
    )
}