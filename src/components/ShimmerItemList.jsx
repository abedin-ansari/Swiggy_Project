const ShimmerItemList = () => {
  return (
    <div className="shimmer-container flex flex-wrap justify-center">
      {Array(10)
        .fill("")
        .map((_, index) => (
          <div
            key={index}
            className="shimmer-card bg-gray-200 h-[50px] w-full sm:w-[350px] m-2 rounded-lg animate-pulse"
          ></div>
        ))}
    </div>
  );
};

export default ShimmerItemList;
