import { useEffect, useState } from "react";
import style from "../Activite/Activite.module.css"
import axios from "../../../api/axios";

const Activite =({id})=>{

    let id__user=localStorage.getItem('id_user')

    let identifiant ={id_user:id__user}

    let [ajout,setAjout]=useState(true)

    let [nomutilisateur,setNomutilisateur]=useState("")

    let [commentaire,setCommentaire]=useState("")

    let [affichage,setAffichage]=useState("")

   

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
        axios.post("/user/scearch_name",identifiant)
        .then((res)=>{
      
            setNomutilisateur(res.data)
        })
        .catch((error)=>{
            console.log("l'identifiant n'est pas la ")
        })

    return(



    <div className={style.bigDiv}>
        <button onClick={handleClick}>Un commentaire </button>
        {ajout ? "":(
            <form action="" onSubmit={(e)=>{
                e.preventDefault();
                let NewArticle = {nom_user:nomutilisateur,commentaire_article:commentaire}
                console.log(NewArticle)
                axios.post("/user/insertActivite",NewArticle)
                .then((res)=>{
                    console.log("success")
                    seti(i+1)
                })
                .catch((error)=>{
                    console.log("not success")
                })
              
            }}>
                <table>
                    <tbody>
                      
                        <tr>
                            <td><label htmlFor="">Description</label><br />
                            <input type="text" onInput={(e)=>{
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
        