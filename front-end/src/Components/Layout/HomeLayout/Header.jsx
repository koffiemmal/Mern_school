import {NavLink, useLocation } from "react-router-dom";
import React, { useContext } from 'react';
import { UserContext } from "../../../Context/UserContextProvider";
import { Outlet } from "react-router-dom";
import style from "../HomeLayout/Header.module.css"
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";


const Header = ({nom}) => {
    const location = useLocation();
    let [remove,setRemove]=useState(0)
   let nomUser = location.state?.nomUser || ''; 
    // récupérer le nom d'utilisateur à partir de props.location.state
    const { user } = useContext(UserContext);
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        setNomutilisateur("")
        navigate('/');
    };
    
    let [nomutilisateur,setNomutilisateur]=useState("");

    useEffect(() => {
        if (nomUser) {
          setNomutilisateur(nomUser);
        }
      }, [nomUser]);

  

    let navigate = useNavigate()
    return(
<div>
        <div className={style.header}>
   <div className={style.logoEcole}></div>

   <div className={style.navbar}>
<span className={style.acceuil} ><NavLink to={"/"}>Acceuil</NavLink></span>
    <span><NavLink to={"/Filiere"}>Formation</NavLink></span>
    <span><NavLink to={"Activite"}>Activite</NavLink></span>
    <span><NavLink to={"/Chat"}>Salon</NavLink></span>
    <span><NavLink to={"/Apropos"}>Apropos</NavLink></span>

   </div>
   <div className={style.loginAndName}>
        {nomutilisateur?(
            <div className={style.username}>
              <span>Bonjour  {nomutilisateur} </span>
              <button className={style.login}type='button' onClick={handleLogout}>
                <div className={style.iconesdeconnexion}></div>
              </button>
            </div>
          ) : (
            <div className={style.login}>
              <span>
                <NavLink to='/Login'>Login</NavLink>
              </span>
            </div>
          )} 
         
        </div>
    

        </div>
        <Outlet/>
     

        <footer>
    <div className={style.footer}>
    <div className={style.aboutUs}>
        <h2>En savoir plus</h2>
      <p>Lorem ipsum dolor sit, <br /> amet consecteturbr <br /> adipisicing elit. Consectetur, ex! Lorem <br /> ipsum, dolor sit amet consectetur adipisicing <br /> elit. Dicta eius fuga enim perferendis laborum ullam.</p>
      <h2>Contact</h2>
    
      <p>+2824342488483 <br />jidi@"jnn.com"
        
      </p>
    </div>
    <div className={style.ourservices}>
        <h2>
            Nos services
        </h2>
   
        <ul className={style.ul}>
            <li>Creation d'article</li> 
            <li>Chat entre etudiant</li>
            <li>redirection authentification</li>
            <li>connexion a la BD</li>
            <li>Parties filieres</li>
            <li> Partie Cours</li>
            <li>Page d'acceuil</li>
        </ul>
        
    </div>
    <div className={style.amelioration}>
        <h2>Suggestion</h2><br />
        <form action="">
            <table>
                <tbody>
                    <tr>
                        <td><input type="email" name="email" id="email" placeholder="entrer votre mail.." /><br /> <br />
                        <input type="text" name="" id=""  placeholder="entrer votre suggestion....."/></td>
                    </tr>
                </tbody>
            </table>
        </form>
    </div>
    </div>
    <div className={style.copyright}>
        <p>&copy; 2023 Messan. Tous droits reservés</p>
    </div>
    
</footer>
        </div>


    )
}

export default Header