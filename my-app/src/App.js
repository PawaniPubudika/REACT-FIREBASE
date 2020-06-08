import React, { useEffect, useState } from "react";
import firebase from "./firebase.js";
// import react from "react";


function App() {

    const [spells, setSpells] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
        const db = firebase.firestore();
        const data = await db.collection("questions").get();
        setSpells(data.docs.map((doc) => ({ ...doc.data()})));
  
      };
    fetchData();
  
    }, []);
  

    return (
  
        <ol>
          {spells.map((spell) => (
              
            <li key={spell.title}>
                {console.log(spell)} 
              <h3>{spell.title}</h3><br/>
              <input type="radio" />{spell.option1}<br/>
              <input type="radio" />{spell.option2}<br/>
              <input type="radio" />{spell.option3}<br/>
             </li>
    
          ))}
          <br/>
              <button type='submit'>Submit</button>
        </ol>
    
      );


  
}
export default App;

