import { useEffect, useState,useContext } from "react";
import style from "../Activite/Activite.module.css"
import {NavLink, useLocation } from "react-router-dom";
import axios from "../../../api/axios";
import { UserContext } from "../../../Context/UserContextProvider";

const Activite =({nom})=>{

    const location = useLocation();

    let nomUser = location.state?.nomUser || ''; 

    const { user } = useContext(UserContext);

    let [ajout,setAjout]=useState(true)

    let [nomutilisateur,setNomutilisateur]=useState("")

    let [images,setImages]=useState("")

    let [filentrer,setFileEntrer]=useState("")

    let [commentaire,setCommentaire]=useState("")

    let [affichage,setAffichage]=useState("")

    console.log(nomutilisateur)

    let [i,seti]=useState(0)
  
        let handleClick =()=>{
    
    setAjout(!ajout)
         }
          
         useEffect(()=>{
            axios.get("/user/vieuw")
            .then((res)=>{
                console.log(res.data)
                setAffichage(res.data)
            })
            .catch((error)=>{
                console.log(error)
            })
         },[i])

    return(



    <div className={style.bigDiv}>
        <button onClick={handleClick}>Un commentaire </button>
        {ajout ? "":(
            <form action="" onSubmit={(e)=>{
                e.preventDefault();
                let NewArticle = {nom_user:nomutilisateur,commentaire_article:commentaire}
                console.log(NewArticle)
                setNomutilisateur(nomUser)
                console.log(nomutilisateur)
                axios.post("/user/insertActivite",NewArticle)
                .then((res)=>{
                    console.log("success")
                })
                .catch((error)=>{
                    console.log("not success")
                })
                seti(i+1)
            }}>
                <table>
                    <tbody>
                      
                        <tr>
                            <td><label htmlFor="">Description</label><br />
                            <input type="text" on={(e)=>{
                                setCommentaire(e.target.value)
                            }} /></td>
                        </tr>
                        <tr>
                            <td>
                                <button type='submit'>Envoyer</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        )}
        <div className={style.container}>
  
  {affichage && affichage.map((img,index)=>{

    return(

<section   key={index} className={style.article}>
      
        <div className={style.articleNom}>{img.nom_user}</div>
        <br />
      
        <div className={style.description}>{img.commentaire_article} <br /><br /> </div>
     

</section>
    )

  })}
   
   

        </div>
        <br />
    </div>
    )
     
        }
        
export default  Activite;
        