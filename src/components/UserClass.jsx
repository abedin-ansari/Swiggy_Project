import { userInfo } from "os";
import React from "react";
import { name } from "tar/lib/types";
import UserContext from "../utils/UserContext";

class UserClass extends React.Component {

    constructor(props) {
        super(props);      // we have to use super(props) before creating state hook(this.state).
    this.state = {
       userInfo: {
        name: "dummy",
        location: "default" // if your code fetches data from api then it is not need for dummy data.
       }
    }
}

    async componentDidMount() {
        const data = await fetch("https://api.github.com/users/akshaymarch7");

        const json = await data.json();
        // console.log(json);

        this.setState({
            userInfo: json,
        })
    }

    render(){

        const { name, location, avatar_url} = this.state.userInfo;

        return(
        <div className='user-class'>
        {/* <img src={avatar_url} /> */}
           <h2>{name}</h2>
           <h3>{location}</h3>
           <h4>mob no. : 7392838298</h4>

           <div>
            loggedInUser -
            <UserContext.Consumer>
                {({loggedInUser}) => <h1 className="font-bold">{loggedInUser}</h1>}
            </UserContext.Consumer>
           </div>
        </div>
        );
    }
}

export default UserClass;