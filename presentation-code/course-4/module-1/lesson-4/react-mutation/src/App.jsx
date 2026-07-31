import React from 'react';
// import update from 'immutability-helper';
import {produce} from "immer";

export default function App() {
    const [profile, setProfile] = React.useState({
        name: "Alice",
        age: 29,
        location: {
            city: "Kalamazoo",
            country: "USA"
        },
        interests: ["running", "photography"]
    });

    function haveBirthday() {
        setProfile(produce((draft) => {
            draft.age += 1;
        }));
        // setProfile(update(profile, {
        //     age: { $set: profile.age + 1 }
        // }))
        // setProfile(prevProfile => ({
        //     ...prevProfile,
        //     age: prevProfile.age + 1
        // }));
    }

    function moveToAnnArbor() {
        setProfile(produce((draft) => {
            draft.location.city = "Ann Arbor";
        }));
        // setProfile(update(profile, {
        //     location: { 
        //         city: { $set: "Ann Arbor" }
        //     }
        // }));
        // setProfile(prevProfile => ({
        //     ...prevProfile,
        //     location: {
        //         ...prevProfile.location,
        //         city: "Ann Arbor"
        //     }
        // }));
    }

    function addInterest() {
        setProfile(produce((draft) => {
            draft.interests.push("cooking");
        }));
        // setProfile(update(profile, {
        //     interests: { 
        //         $push: ["cooking"]
        //     }
        // }));
        // setProfile(prevProfile => ({
        //     ...prevProfile,
        //     interests: [
        //         ...prevProfile.interests, "cooking"
        //     ]
        // }));
    }

    return <div>
        <h1>User Profile</h1>

        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Age:</strong> {profile.age}</p>
        <p><strong>Location:</strong> {profile.location.city}, {profile.location.country}</p>
        <p><strong>Interests:</strong> {profile.interests.join(", ")}</p>

        <button onClick={haveBirthday}>Celebrate Birthday (+1 age)</button>
        <button onClick={moveToAnnArbor}>Move to Ann Arbor</button>
        <button onClick={addInterest}>Add "cooking" Interest</button>
    </div>;
}