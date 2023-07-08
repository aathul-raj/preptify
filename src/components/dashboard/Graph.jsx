import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Graph(){
    const data = [
        { day: 31, score: 7 },
        { day: 1, score: 8 },
        { day: 2, score: 6 },
        { day: 3, score: 5 },
        { day: 4, score: 7 },
        { day: 5, score: 6 },
        { day: 6, score: 9 },
        { day: 7, score: 5 },
        { day: 8, score: 8 },
        { day: 10, score: 6 },
      ];
    
    let firstDay = data[0].day;
    const minScore = Math.min(...data.map(item => item.score));
    const maxScore = Math.max(...data.map(item => item.score));
    const yAxisTicks = Array.from({length: maxScore - minScore + 1}, (_, i) => minScore + i);

    function formatXAxis(value) {
        if(value === firstDay) return ""
        return value
    }

    function formatYAxis(value) {
        if(value === minScore) return ""
        return value
    }
    

    return <div className="score-progress tile">
        <div className="chart-text">
            <h2>Progress</h2>
            <div className="legend">
                <div className="legend-circle"></div>
                <span>Average Score</span>
            </div>
        </div>
        <ResponsiveContainer width="105%" height="60%" className='chart-container'>
            <LineChart
            data={data}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
            >
            <XAxis dataKey="day" stroke="#979797" axisLine={false} tickLine={false} tickFormatter={formatXAxis}/>
            <YAxis domain={['dataMin', 'dataMax']} ticks={yAxisTicks} stroke="#979797" axisLine={false} tickLine={false} tickFormatter={formatYAxis}/>
            <CartesianGrid stroke="#36373A" strokeDasharray="5 5" vertical={false} />
            <Line type="monotone" dataKey="score" stroke="#15D59F" activeDot={{ r: 8 }} isAnimationActive={true} strokeWidth={3.5}/>
            </LineChart>
        </ResponsiveContainer>
    </div>
}