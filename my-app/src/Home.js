// import React from "react";
import app from "./firebase";
import React, { useEffect, useState,useContext } from "react";
import firebase from "./firebase.js";
import 'firebase/firestore';
import { AuthContext } from "./Auth.js";
import styles from "./Home.module.css"





const Home = () => {

  const { currentUser } = useContext(AuthContext);
  const [spells, setSpells] = useState([]);
  const [userDetails, setuserDetails] = useState([]);
  const [userAnswers, setUserAnswers] = React.useState([]);

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

      useEffect(()=>{
        let userdetailsArray=userDetails;

        for(let i=0;i<userdetailsArray.length;i++){
          if(userdetailsArray[i].email===currentUser.email){
            if(userdetailsArray[i].attempt3!==""){
            alert("you tried maximum attempt!!!");
            }
          }}



      },[userDetails])

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

     function display(){
     let userdetailsArray=userDetails;
     for(let i=0;i<userdetailsArray.length;i++){
     if(userdetailsArray[i].email===currentUser.email){
      alert("First attempt score: "+userdetailsArray[i].attempt1+"    "+"Second attempt score: "+userdetailsArray[i].attempt2+"    "+"Third attempt score: "+userdetailsArray[i].attempt3);
        }
      }

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

             

    
           
     let userdetailsArray=userDetails;

      console.log(userdetailsArray);
     
      for(let i=0;i<userdetailsArray.length;i++){
        const db = firebase.firestore();
      if(userdetailsArray[i].email===currentUser.email){
        
        if(userdetailsArray[i].attempt1===""){
          // alert("hi");
          
          db.collection("user_data").doc(userdetailsArray[i].id).update({ attempt1: score});
          alert("your score"+" "+score);
          // db.collection("user_data").add({attemp1:score});
         
          
          }else{
            if(userdetailsArray[i].attempt2===""){
              
              db.collection("user_data").doc(userdetailsArray[i].id).update({ attempt2: score});
              alert("your score"+" "+score);

              // db.collection("user_data").add({ ...userdetailsArray[i], userScore});
              }else{
                  if(userdetailsArray[i].attempt3===""){
                    
                    db.collection("user_data").doc(userdetailsArray[i].id).update({ attempt3: score});
                    alert("your score"+" "+score);

                    // db.collection("user_data").add({ ...userdetailsArray[i], userScore});
                  }else{ 
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
          <br/><br/>

              <button className={styles.butt} type='submit' onClick={dosubmit}>Submit</button>
              <button className={styles.butt} onClick={refreshPage}>Try Again</button>
              <button className={styles.butt} onClick={display}>Result</button><br/><br/>
              <button className={styles.butt} onClick={() => app.auth().signOut()}>Sign out</button><br/><br/>
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