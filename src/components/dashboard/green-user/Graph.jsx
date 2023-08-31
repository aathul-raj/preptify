import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function Graph( {historicalScores, styles} ){
    let recentScores = historicalScores.slice(Math.max(historicalScores.length - 10, 0));
    let data = recentScores.map((score, index) => {
        return { day: index + 1, score: score }
    });

    const minScore = Math.min(...data.map(item => item.score));
    const maxScore = Math.max(...data.map(item => item.score));
    const yAxisTicks = Array.from({length: maxScore - minScore + 1}, (_, i) => minScore + i);

    const CustomTooltip = ({ payload, active }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip" style={{ backgroundColor: 'transparent' }}>
                    <p>{`Score : ${Number(payload[0].value).toFixed(1)}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className={styles["score-progress"] + " " + styles["tile"]}>
            <div className={styles["chart-text"]}>
                <h1>Progress</h1>
                <div className={styles["legend"]}>
                    <div className={styles["legend-circle"]}></div>
                    <span>Recent Interview Scores</span>
                </div>
            </div>
            <ResponsiveContainer width="105%" height="60%" className={styles['chart-container']}>
                <LineChart
                data={data}
                margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                >
                <XAxis dataKey="day" stroke="#979797" axisLine={false} tickLine={false}/>
                <YAxis domain={['dataMin', 'dataMax']} ticks={yAxisTicks} stroke="#979797" axisLine={false} tickLine={false} tickFormatter={(value) => Math.floor(value)}/>
                <CartesianGrid stroke="#36373A" strokeDasharray="5 5" vertical={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="score" stroke="#15D59F" activeDot={{ r: 8 }} isAnimationActive={true} strokeWidth={3.5}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
