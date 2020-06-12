// import React from "react";
import app from "./firebase";
import React, { useEffect, useState,useContext } from "react";
import firebase from "./firebase.js";
import 'firebase/firestore';
import { AuthContext } from "./Auth.js";





const Home = () => {

  const { currentUser } = useContext(AuthContext);
  const [spells, setSpells] = useState([]);
  const [userDetails, setuserDetails] = useState([]);
    const [userAnswers, setUserAnswers] = React.useState([]);
    // const [attemp1, setattemp1] = React.useState([]); 
    // const [attemp2, setattemp2] = React.useState([]); 
    // const [attemp3, setattemp3] = React.useState([]); 
    // console.log(currentUser);
    // const [userScores, setUserScores] = React.useState([]);
        useEffect(() => {
        const fetchData = async() => {
        const db = firebase.firestore();
        const data = await db.collection("questions").get();
        setSpells(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        const datan = await db.collection("user_data").get();
        setuserDetails(datan.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        
  
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
      // console.log(userAnswers);
    }
  

    function dosubmit(){
  
      //callculate score
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
             }

             alert("your score"+" "+score);
             //setuserSCore  
            //  setattemp1(score);
            //  setattemp2(score);
            //  setattemp3(score);  
            //  console.log(attemp1);

    
     //create userdetails array equal userdetails to it        
     let userdetailsArray=userDetails;

      console.log(userdetailsArray[0].email);
      //check every user email in userdetailsArray equal to currentUser email
      for(let i=0;i<userdetailsArray.length;i++){
      if(userdetailsArray[i].email==currentUser.email){
        alert("done");
        //check attempt
        //if it is equal? then check ,in that object attempt1 is null? if it is null then update score(attempt1-->score)
        if(userdetailsArray[i].attemp1==null){
          const db = firebase.firestore();
          db.collection("user_data").doc(userdetailsArray[i].id).set({ attemp1: score});
          // db.collection("user_data").add({attemp1:score});

          //not null ?then check attempt 2 is null & do the same
          }else{
            if(userdetailsArray[i].attemp2==null){
              const db = firebase.firestore();
              db.collection("user_data").doc(userdetailsArray[i].id).set({ attemp2: score});

              // db.collection("user_data").add({ ...userdetailsArray[i], userScore});
              }else{
                  if(userdetailsArray[i].attemp3==null){
                    const db = firebase.firestore();
                    db.collection("user_data").doc(userdetailsArray[i].id).set({ attemp3: score});

                    // db.collection("user_data").add({ ...userdetailsArray[i], userScore});
                  }else{ //every attempts field are not null then you can't update,
                    alert("you tried maximum attempt!!!");
                    window.location.reload(false);
                  }
    
              }
          }

      }
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
              
              
              {/* {userDetails.map((user)=>(

            <li key={user.email}>
            <h2>{user.email}</h2>
            {console.log(user)}
            </li>
              ))} */}





        </ol>

 );
      
};

export default Home;