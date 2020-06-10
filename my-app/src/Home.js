// import React from "react";
import app from "./firebase";
import React, { useEffect, useState } from "react";
import firebase from "./firebase.js";
import 'firebase/firestore';



const Home = () => {

  const [spells, setSpells] = useState([]);
    const [userAnswers, setUserAnswers] = React.useState([]);
    const [scoresN, setscoresN] = useState([]);
    // const [userScores, setUserScores] = React.useState([]);
        useEffect(() => {
        const fetchData = async() => {
        const db = firebase.firestore();
        const data = await db.collection("questions").get();
        setSpells(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        const datan = await db.collection("scores").get();
        setscoresN(datan.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  
      };
    fetchData();
  
    }, []);


    function handleChange(quizId, correctAnswer, userSelection) {
      let selectionArray = userAnswers;
      const index = selectionArray.findIndex(
        (userAnswer) => userAnswer.quizId === quizId
      );
      
      if (index < 0) {
        selectionArray = [...selectionArray,{ quizId, correctAnswer, userSelection },
        ];
      } else {
        selectionArray[index] = { quizId, correctAnswer, userSelection };
      }
      setUserAnswers(selectionArray);
      console.log(userAnswers);
    }
    

    function dosubmit(){
      //first check attempts you tried
      let scoresArray = scoresN;
      if(scoresArray.length<3){
      console.log(scoresArray.length);

      //secondly check correct answer and increase score
      let score=0;
      for (let i = 0; i < 5; i++) {
        console.log(userAnswers[i].userSelection+" "+userAnswers[i].correctAnswer );
        //check weather every and each user answer is correct to answer and increase score
        if(userAnswers[i].userSelection===userAnswers[i].correctAnswer){
            score++;
            //nothing happen to score if answers are incorrect
           }else if(userAnswers[i].userSelection!==userAnswers[i].correctAnswer){}
           else{
            //you can't click submit button unless complete the quiz 
            alert("Youshould complete to submit try again!");
            window.location.reload(false);
           }
       }    //get scores from firebase and display it through alert 
            const db=firebase.firestore();
            db.collection("scores").add({score:score});
            alert("your score:"+" "+score);
            window.location.reload(false);
      }
      
      else{
        alert("you tried maximum attempt!!!");
        window.location.reload(false);
      }
    }

    //refresh function to refresh page
    function refreshPage(){
      window.location.reload(false);
    }
    
  
 
    return (
          <ol>
            <h1>Home</h1>
          {spells.map((spell) => (
              <li key={spell.title}>
                
                {/* {console.log(spell)}  */}
              <h3>{spell.title}</h3><br/>
              <input type="radio" name ={spell.id} value={spell.option1} onChange={(e) =>handleChange(spell.id, spell.answer, e.target.value)}/>{spell.option1}<br/>
              <input type="radio" name ={spell.id} value={spell.option2} onChange={(e) =>handleChange(spell.id, spell.answer, e.target.value)}/>{spell.option2}<br/>
              <input type="radio" name ={spell.id} value={spell.option3} onChange={(e) =>handleChange(spell.id, spell.answer, e.target.value)}/>{spell.option3}<br/>
            </li>  
          ))}
          <br/>
              
              <button onClick={() => app.auth().signOut()}>Sign out</button>
              <button type='submit' onClick={dosubmit}>Submit</button><br/><br/>
              <button onClick={refreshPage}>Try Again</button>
        </ol>
    
      );






  // return (
  //   <>
  //   <h1>Home</h1>
  //   <button onClick={() => app.auth().signOut()}>Sign out</button>
  //   </>
  // );
};

export default Home;