export default function useEngine( {feedback, userTranscript, role, responseTimes=null, lagTimes=null,} ) {
    let responseTimeSum;
    let averageResponseTime;
    let averageLagTime;
    let lagTimeSum;
    
    if (lagTimes) {
        responseTimeSum = responseTimes.reduce((a, b) => a + b, 0)
        averageResponseTime = responseTimeSum / responseTimes.length
        lagTimeSum = lagTimes.reduce((a, b) => a + b, 0)
        averageLagTime = lagTimeSum / lagTimes.length
    }
    

    const transcriptWords = userTranscript.toLowerCase().split(/\W+/)
    let commBank = ["uh", "like", "hm"]
    let behavioralBank = ["we achieved", "together", "collaboratively"]
    let psBank = ["the problem is", "we need to solve"]
    let roleBank = ["coding", "software", "tech"]
    let commCounter = 0
    let behavioralCounter = 0
    let psCounter = 0
    let roleCounter = 0
    const adjustments = {"comm" : 0, "ps" : 0, "tech" : 0, "behavioral": 0, "overall" : 0}

    transcriptWords.forEach(word => {
        if (commBank.includes(word)){
            commCounter++
        } else if (behavioralBank.includes(word)){
            behavioralCounter++
        } else if (psBank.includes(word)){
            psCounter++
        } else if (roleBank.includes(word)){
            roleCounter++
        }
    })

    if (lagTimes){
        if (averageResponseTime <= 10){
            adjustments["overall"] = adjustments["overall"] - 2
        } else if (averageResponseTime <= 20) {
            adjustments["comm"] = adjustments["comm"] - 1.5
            adjustments["behavioral"] = adjustments["behavioral"] - 2
        }
    
        if (averageLagTime <= 10){
            adjustments["comm"] = adjustments["comm"] - 1
        }
    }

    console.log(lagTimes)

    adjustments["comm"] = adjustments["comm"] - (commCounter * .5)
    adjustments["behavioral"] = adjustments["behavioral"] + (behavioralCounter > 10 ? 2 : behavioralCounter * .2)
    adjustments["tech"] = adjustments["tech"] + (roleCounter > 10 ? 2 : roleCounter * .2)
    adjustments["ps"] = adjustments["ps"] + (psCounter > 5 ? 2 : psCounter * .4)

    return adjustments
}