import style from "../Admin/Admin.module.css"
import axios from "../../../api/axios"
import { useEffect, useState } from "react"

const Admin=()=>{
let [containerfiliere,setContainerFiliere]=useState("")
let [id_filiere,setId_filiere]=useState("")
    let [nomfiliere,setNomfiliere]=useState("")
    let [descfiliere,setDescfiliere]=useState("")
   let [i ,setI]=useState(0)
  let [nomMatiere,setNomMatiere]=useState("");
  let [dureeMatiere,setDureeMatiere]=useState("");
  let [desc1,setDesc1]=useState("");
  let [desc2,setDesc2]=useState("")
  let [listefilieres,setListeFiliere]=useState("")
  let [matiere,setmatiere] = useState("")
  let [a ,seta]=useState(0)

useEffect(()=>{
    axios.get("/user/liste").then(res=>{
setContainerFiliere(res.data)


})
},[i]
)

useEffect(()=>{
    axios.get("/user/getAll")
    .then((res)=>{
        setmatiere(res.data)
    })
},[i])

    return(

        <div className={style.container}>
           <h1>
            BIENVENUE ADMINISTATEUR
           </h1>

           <h2>GESTION DES FILLIERE</h2>
         <div className={style.filiere}>
            
<form onSubmit={(e)=>{
    e.preventDefault();
    console.log(containerfiliere.length)
    let newFiliere = {nom_filiere:nomfiliere,description_filiere:descfiliere}
    setI(i+1); // Incrémente i en utilisant setI
    console.log(i)
    axios.post("/user/insertFiliere",newFiliere)
    .then((res)=>{

        console.log("la filiere a etre entrer avec succes")
    })
    .catch((error)=>{
        console.log("error")
    })
 
    console.log(newFiliere)
}}>
    <table>
        <tbody>
            <tr>
                <td>
                    <label htmlFor="nom">filiere Nom :</label><br />
                    <input type="text" id="nom" onInput={(e)=>{
                        setNomfiliere(e.target.value)
                    }} />
                </td>
                
            </tr>
            <tr>
                <td>
                    <label htmlFor="desc">filiere Description :</label><br />
                    <input type="text" name="desc" id="desc" onInput={(e)=>{
                        setDescfiliere(e.target.value)
                    }}/>
                </td>
            </tr>
            <tr>
                <td>
                    <button type="submit">Ajouter</button>
                </td>
            </tr>
        </tbody>
    </table>
</form>
<h3>Listes des Filieres</h3>
<div className={style.listeFiliere}>
    {containerfiliere && containerfiliere.map((filiere,index)=>{
        return(
<div key={index}>
    <h3>Filiere :{filiere.nom_filiere}</h3>
    <p> <i>Description</i> :{filiere.description_filiere}</p>

    <button onClick={()=>{

          let id ={id_filiere:filiere.id_filiere}
             console.log(id)
                 setI(i+1)
                     axios.post("/user/delete",id)
                          .then((res)=>{
                            console.log("suppression realiser avec succes")
                        })
                              .catch((req)=>{
                            console.log("supression non realiser")
              })}   }>Supprimer</button>
</div>

        )
    })}
</div>
         </div>
           <h2 >GESTION DES MATIERES</h2>
           <div className={style.matiere}>
<form action="" 

onSubmit={(e)=>{

         e.preventDefault();
                 let NewMatiere = {id_filiere:id_filiere,nom_matiere:nomMatiere,duree_matiere:dureeMatiere,description_matiere:desc1,description2_matiere:desc2}
                       console.log(NewMatiere)
                               axios.post("/user/insertmatiere",NewMatiere)
                                   .then((res)=>{
                           console.log("insertion reussis")
                       })
                               .catch((error)=>{
                           console.log("insertion non reussis")
                              })
                             setI(i+1)
}}

>
    <table>
        <tbody>
            <tr>
                <td>
                    <label htmlFor="">Listes des filiere</label>
                    <select name="" id="" onChange={(e)=>{
                        setId_filiere(e.target.value)

                    }}>
                        <option value=""></option>
                        {containerfiliere && containerfiliere.map((liste,index)=>{
                            let id= {id_filiere:liste.id_filiere}
                         
                            return(

                               <option key={index} value={liste.id_filiere} >{liste.nom_filiere}</option> 
                               

                              
                            )
                        })}

                       
                    </select>
                </td>
            </tr>
            <tr>
                <td>
                    <label htmlFor="Cous">Nom matiere :</label><br />
                    <input type="text" name="Cours" id="Cours" onInput={(e)=>{
                        setNomMatiere(e.target.value)
                    }} />
                </td>
            </tr>
            <tr>
                <td>
                    <label htmlFor="duree">Duree de la matiere :</label><br />
                    <input type="number" name="duree" id="duree" onInput={(e)=>{
                        setDureeMatiere(e.target.value)
                    }} />
                </td>
            </tr>
            <tr>
                <td>
                    <label htmlFor="desc1">description_briev :</label><br />
                    <input type="text" name="desc1" id="desc1" onInput={(e)=>{
                        setDesc1(e.target.value)
                    }} />
                </td>
            </tr>
            <tr>
                <td>
                    <label htmlFor="desc2">description_entiere :</label><br />
                    <input type="text" name="desc2" id="desc2" onInput={(e)=>{
                        setDesc2(e.target.value)
                    }} />
                </td>
            </tr>
            <tr>
                <td>
                    <button type="submit">Ajouter</button>
                </td>
            </tr>
        </tbody>
    </table>
</form>
<div className={style.listmatiere}>

{matiere && matiere.map((matiere,index)=>{
    
    
   return(
    <section key={index}>

    <h2>Matiere :{matiere.nom_matiere}</h2> <p>Filiere :{matiere.nom_filiere} </p><br />
    <span>Durée :{matiere.duree_matiere} Heures</span> <button onClick={()=>{
        setI(i+1)
        let id = {id_matiere:matiere.id_matiere}
        axios.post("/user/delMatiere",id)
        .then((res)=>{
            console.log("suppression effectuer")
        })
        .catch((error)=>{
            console.log("supprission bloquer")
        })
    }}>supprimer</button>


</section>
   )
})}

</div>
           </div>
           
           <h2>GESTION DES ACTIVITES</h2>
           <div className={style.activite}>
case
           </div>

        </div>
    )
}
export default Admin;