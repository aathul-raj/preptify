import Carousel from "./Carousel";

export default function RecentFeedback( {recentFeedback, styles} ){
    
    return <div className={`${styles["recent-feedback"]} ${styles["tile"]}`}>
        <h1 className={`${styles["tile-heading"]} ${styles["feedback-heading"]}`}>Recent Feedback</h1>
        <Carousel feedback={recentFeedback} styles={styles}/>
    </div>
}