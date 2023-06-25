import Tile from "./Tile"
import RecentFeedback from "./RecentFeedback"
import CategoryScores from "./CategoryScores"
import Graph from "./Graph"

export default function Analytics(){
    return <>
        <CategoryScores/>
        <Tile name="average-time" heading="Average Time to Answer (seconds)" subheading="12% Increase from Last Week" score={39} status="increase"/>
        <Tile name="overall-score" heading="Overall Score" subheading="3% Decrease from Last Week" score={9.3} status="decrease"/>
        <Graph/>
        <RecentFeedback/>
        <Tile name="minutes-per-day" heading="Minutes Per Day" subheading="12% Increase from Last Week" score={52} status="increase"/>
        <Tile name="interviews-completed" heading="Interviews Completed" subheading="Keep it going!" score={150} status="increase"/>
    </>
}