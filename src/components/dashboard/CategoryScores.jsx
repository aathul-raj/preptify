import ProgressBar from "./ProgressBar"

export default function CategoryScores({communication, technical, ps, behavioral}){
    return (
        <div className="tile category-scores">
            <ProgressBar className="progress" value={communication} max={10} color="#4F3CC3">Comm.</ProgressBar>
            <ProgressBar className="progress" value={technical} max={10} color="#C77C0B">Technical</ProgressBar>
            <ProgressBar className="progress" value={ps} max={10} color="#D515C2">Problem Solving</ProgressBar>
            <ProgressBar className="progress" value={behavioral} max={10} color="#15B2D5">Behavioral</ProgressBar>
        </div>
    )
}