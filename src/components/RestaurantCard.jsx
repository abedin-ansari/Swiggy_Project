import { CDN_url } from "../utils/constants";

const RestrourantCard = (props) => {
    const {resData} = props; // (ResData will always comes from fn. compon. argument)
    //console.log(resData);

    const {
         cloudinaryImageId, // these means destructuring the data
         name, 
         cuisines,
         avgRating, 
         costForTwo,
         sla
        } = resData?.info; // (? is optional chaining)

    return (
        // <div className="w-[250px] p-2 bg-pink-300 m-2">
        <div className="w-[280px] h-[350px] p-2 rounded-lg overflow-hidden bg-pink-300 my-1 ml-5 px-2">
          <img
          // className="card-img w-56 h-52 rounded-lg"
           className="w-full h-[150px] object-cover rounded-lg"
           alt="food"
           src={
            CDN_url+cloudinaryImageId
            }
          />
          <h3 className="my-2 font-semibold">{name}</h3> {/* if we doesnt destructure then h3 should look like this {props.resName} */}
          <h4 className="my-1">{cuisines.join(", ")}</h4> {/* Array join JavaScript(used for comma between arrays) */}
          <h4>{avgRating} Stars</h4>
          <h4>{costForTwo}</h4>
          <h4>Delivery in {sla.deliveryTime} minutes</h4>
        </div>
    );
}

export const withPromotedLabel = (RestrourantCard) => {  // It is a Higher Order Component. Which returns
  return (props) => {                                   // A component & this Compo. is a fn. which 
    return(                                             // Simply returns Some piece of JSX code
      <div>
        <label className="absolute bg-black text-white m-2 p-2 rounded-lg">Promoted</label>
        <RestrourantCard {...props} />
      </div>
    )
  }
}

export default RestrourantCard;