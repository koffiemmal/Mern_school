import { NavLink, useNavigate } from "react-router-dom";
import style from "../SignIN/Signin.module.css"
import { useState } from "react";
/* import axios from "axios" */
import axios from "../../../api/axios";

const Signin=()=>{

    let navigate =useNavigate()
    let [nomInput,setNomInput]=useState("")
    let [prenomInput,setPrenomInput]=useState("")
    let [emailInput,setEmailInput]=useState("")
    let [ageInput,setAgeInput]=useState("")
    let [paysInput,setPaysInput]=useState("")
    let [motDePasseInput,setMotDePasseInput]=useState("")

    return(

        <div className={style.container}>
<form className={style.formulaire} onSubmit={(e)=>{
    e.preventDefault()
    let NewStudent ={id_role:1,nom_user:nomInput,prenom_user:prenomInput,email_user:emailInput,age_user:ageInput,pays_user:paysInput,motdepasse_user:motDePasseInput}
    console.log(NewStudent)
    console.log(typeof(ageInput))

    axios.post("/user/signup",NewStudent)
    .then((res)=>{
        console.log(res)
navigate("/Login")
    })
    .catch((error)=>{console.log(error)})

}}>
    <table>
        <tbody>
            <tr>
                <td>
                    <label htmlFor="nom">Nom:</label><br />
                    <input type="text" id="nom" name="nom" placeholder="Nom..." required  onInput={(e)=>{
                        setNomInput(e.target.value)
                    }}/>
                </td>
            </tr>
            <tr>
                <td>
                    <label htmlFor="prenom">Prenom :</label><br />
                    <input type="text" id="prenom" name="prenom" placeholder="Prenom ..." required  onInput={(e)=>{
                        setPrenomInput(e.target.value)
                    }}/>
                </td>
            </tr>
            <tr>
                <td>
                    <label htmlFor="email">Email :</label><br />
                    <input type="email" name="email" id="email" required placeholder="example@exxxx.ccc"  onInput={(e)=>{
                        setEmailInput(e.target.value)
                    }}/>
                </td>
            </tr>
            <tr>
                <td>
                    <label htmlFor="age">Age:</label><br />
                    <input type="number" name="age" id="age"  required onInput={(e)=>{
                        setAgeInput(e.target.value)
                    }}/>
                </td>
            </tr>
            <tr>
                <td>
                    <label htmlFor="Pays">Pays</label><br />

                    <select name="Pays" id="Pays" required onChange={(e)=>{
                        setPaysInput(e.target.value)
                    }}>
                        <option value="">...</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Benin">Benin</option>
                        <option value="Tchad">Tchad</option>
                        <option value="Togo">Togo</option>
                        <option value="Nigéria">Nigéria</option>
                        <option value="Burkina-Faso">Burkina-Faso</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>
                    <label htmlFor="motdepasse">Mot de passe :</label><br />
                    <input type="password" name="motdepasse" id="motdepasse" required placeholder="password.." onInput={(e)=>{
                        setMotDePasseInput(e.target.value)
                    }} />
                </td>
            </tr>
            <tr>
               <td>
               <button type="submit">S'inscrire</button>
               <p>Vous avez deja un compte ?<br /> alors <NavLink to={"/Login"}>GO VOUS CONNECTEZ!!!!</NavLink></p>
               </td>
            </tr>
        </tbody>
    </table>
</form>


        </div>
    )


}

export default Signin;