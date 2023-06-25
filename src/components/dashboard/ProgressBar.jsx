export default function ProgressBar({value, max, children, color}){
    const percent = (value / max) * 100;

    return (
        <div className="progress-container">
            <div className="progress" style={{ 
                backgroundColor: `${color}`, 
                width: `${percent}%`
             }}/>
            <div className="positioner">
                <div className="progress-text">
                    <span>{children}</span>
                    <span className="p-text-right" style={{
                        color: `${color}`
                    }}>{value}</span>
                </div>
            </div>
        </div>
    )
}