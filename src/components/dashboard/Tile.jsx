export default function Tile( {name, heading, subheading, score, status} ){
    return <div className={`tile ${name}`}>
        <div className="tile-text">
            <h1 className="tile-heading">{heading}</h1>
            <h2 className="tile-subheading">{subheading}</h2>
        </div>
        <h1 className={`${status} tile-score`}>{score}</h1>
    </div>
}