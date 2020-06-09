import React, { useEffect, useState } from "react";
import firebase from "./firebase.js";
// import react from "react";


function App() {

    const [spells, setSpells] = useState([]);
    const [newarray, setNewArray] = React.useState([]);
    useEffect(() => {
        const fetchData = async () => {
        const db = firebase.firestore();
        const data = await db.collection("questions").get();
        setSpells(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  
      };
    fetchData();
  
    }, []);

    function handleChange(e) {
      console.log(e.target.value);
      // console.log(e.target.name);
      // var choices=[e.target.value];
      // console.log(choices);
      // console.log(choices[0],choices[1],choices[2],choices[3],choices[4]);
      
    }
    
    function dosubmit(){
      var answers;
      spells.map((spell) => (
        <div key={spell.id}>
        {console.log(spell.answer)}
        </div>
      ))
    }
  
 
    return (
  
        <ol>
          {spells.map((spell) => (
              
            <li key={spell.title}>
                {console.log(spell)} 
              <h3>{spell.title}</h3><br/>
              <input type="radio" name ={spell.id} value={spell.option1} onChange={handleChange}/>{spell.option1}<br/>
              <input type="radio" name ={spell.id} value={spell.option2} onChange={handleChange}/>{spell.option2}<br/>
              <input type="radio" name ={spell.id} value={spell.option3} onChange={handleChange}/>{spell.option3}<br/>
            </li>  
          ))}
          <br/>
              <button type='submit' onClick={dosubmit}>Submit</button>
        </ol>
    
      );


  
}
export default App;

