import React, { useEffect, useState } from "react";
import styles from "./Cours.module.css";
import { useParams } from "react-router-dom";
import axios from "../../../api/axios";

const Cours = () => {
  let [cours, setCours] = useState(true);
  let {id_filiere}=useParams();
  let [showCours,setShowCours]=useState("")
  let [nomFiliere,setNomFiliere]=useState("")

  let handleClick = () => {
    setCours(!cours);
  };
  useEffect(()=>{
    axios.post("/user/getspecifyMatiere",{id_filiere})
    .then((res)=>{
 
      setShowCours(res.data)
    })
    .catch((error)=>{
      console.log("error")
    })
  },[])
  useEffect(()=>{
    axios.post("/user/getFiliereName",{id_filiere})
    .then((res)=>{
     
      setNomFiliere(res.data)
    })
  },[])

  return (
    <div className={styles.container}>
     {nomFiliere && nomFiliere.map((nom,index)=>{
      return(
        <h1>{nom.nom_filiere}</h1>
      )
     })}
      <div>
        <div className={styles.changement}>
       
        {showCours && showCours.map((element,index)=>{
          return(
             <div key={index}>
        
              <section className={styles.cours}>
                <p>
                  Matiere:<h2>{element.nom_matiere}</h2>     | Durée:<h3>{element.duree_matiere} heures </h3> |     Description: {element.description_matiere} <br />
                  <button >Commencer</button>
                </p>
                
              </section>
          
</div>

          )
        })}
        </div>
        <br />
      </div>
      <br />
    </div>
  );
};

export default Cours;
