// const Shimmer = () => {
//     return <div className="shimmer-container">
//         <div className="shimmer-cards"></div>
//         <div className="shimmer-cards"></div>
//         <div className="shimmer-cards"></div>
//         <div className="shimmer-cards"></div>
//         <div className="shimmer-cards"></div>
//         <div className="shimmer-cards"></div>
//         <div className="shimmer-cards"></div>
//         <div className="shimmer-cards"></div>
//         <div className="shimmer-cards"></div>
//         <div className="shimmer-cards"></div>
//         <div className="shimmer-cards"></div>
//         <div className="shimmer-cards"></div>
//         <div className="shimmer-cards"></div>
//         <div className="shimmer-cards"></div>
//         <div className="shimmer-cards"></div>
//         <div className="shimmer-cards"></div>
//         <div className="shimmer-cards"></div>
//         <div className="shimmer-cards"></div>
//     </div>
// }

// export default Shimmer;

const Shimmer = () => {
    return (
        <div className="shimmer-container flex flex-wrap">
            {Array(18).fill("").map((_, index) => (
                <div 
                    key={index} 
                    className="shimmer-card bg-gray-400 h-[350px] w-[260px] m-4 rounded-lg animate-pulse"
                ></div>
            ))}
        </div>
    );
}

export default Shimmer;
