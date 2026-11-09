function StatCard ({title, value, type}) {
    return (
        <div className={`card card-${type}`}>
            <h3>{title}</h3>
            <p>{value}</p>
        </div>
    )
}
export default StatCard