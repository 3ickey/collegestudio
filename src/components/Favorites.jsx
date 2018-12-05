import React, { Component } from "react";
import SchoolCard from "./SchoolCard"
import firebase from "firebase/app"

class Favorites extends Component {
    render() {
        let favorites = null;
        let heading = null;
        if (this.props.currentUser) {
            firebase.database().ref('users/' + this.props.currentUser.uid + '/favorites/').on('value', (snapshot) => {
                let values = snapshot.val();
                if(values != null) {
                    favorites = (Object.keys(values).map(key => (
                        <SchoolCard key={key} id={key} isFavorited={true} Schooldetails={values[key]} currentUser={this.props.currentUser}/>
                    )));
                } else {
                    favorites = (<h1 className= "pt-5">You have no favorite schools!</h1>)
                }
            });
             heading = (<h1 className= " searchTextPH pt-5">Your favorites schools</h1>)
        } else {
            favorites = <h1 className="pt-5">You must be logged in to use this feature!</h1>
        }
        return (
            <div className="container pt-5">
                {heading}
                <div className = "row">
                    {favorites}
                </div>

            </div>
        );
    }
}

export default Favorites;