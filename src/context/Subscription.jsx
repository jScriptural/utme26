import {getDocs, collection} from "firebase/firestore";
import db from "../firebase/firebase.store.js";
import {
  useState,
  createContext,
  useContext } from "react";


const SubscriptionContext = createContext();
function useSubscription(){
  return useContext(SubscriptionContext);
}

const subjects = [
  {id: "eng",value: "Use of English"},
  {id: "accounting",value: "Principles of Accounting"},
  {id: "agric",value: "Agricultural Science"},
  {id: "arabic",value: "Arabic"},
  {id: "biology",value: "Biology"},
  {id: "chemistry",value: "Chemistry"},
  {id: "crs",value: "Christian Religious Studies"},
  {id: "commerce",value: "Commerce"},
  {id: "econs",value: "Economics"},
  {id: "visualArts",value: "Visual Arts"},
  {id: "french",value: "French"},
  {id: "geo",value: "Geography"},
  {id: "govt",value: "Government"},
  {id: "hausa",value: "Hausa"},
  {id: "history",value: "History"},
  {id: "homeEcons",value: "Home Economics"},
  {id: "igbo",value: "Igbo"},
  {id: "irs",value: "Islamic Religious Studies"},
  {id: "litInEng",value: "Literature in English"},
  {id: "Maths",value: "Mathematics"},
  {id: "music",value: "Music"},
  {id: "physics",value: "Physics"},
  {id: "yoruba",value: "Yoruba"},
];



function SubscriptionProvider({children}){
  const [selections, setSelections] = useState([]);
  const [questions,setQuestions] = useState([]);

  async function getRandomQ(subject,limit=5){
    const qs = await getDocs(collection(db,`subjects/${subject}/questions`));
    const q = [];
    qs.forEach(doc=>q.push(doc.data()));
    return q.sort(()=>Math.random()-0.5).slice(0,limit);
  }

  const value = {
    selections,
    setSelections,
    getRandomQ,
    setQuestions,
    questions
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>)
}


export {
  SubscriptionProvider as default,
  subjects,
  useSubscription };


