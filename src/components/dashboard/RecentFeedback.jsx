import Carousel from "./Carousel";

export default function RecentFeedback( {recentFeedback} ){
//     const feedback = ["“Your interview performance could benefit from providing more specific examples and demonstrating a deeper understanding of industry trends.”",
//                     "“Improving your communication skills, such as minimizing interruptions and enhancing clarity, would be valuable.”",
//                     "“On a positive note, your enthusiasm and technical knowledge were impressive, indicating potential for success with some refinements in your responses.”"
// ]
    return <div className="recent-feedback tile">
        <h1 className="tile-heading feedback-heading">Recent Feedback</h1>
        <Carousel feedback={recentFeedback}/>
    </div>
}