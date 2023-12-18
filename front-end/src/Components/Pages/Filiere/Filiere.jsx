import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from "../Filiere/Filiere.module.css"
import { useNavigate,Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import axios from "../../../api/axios"


const Filiere = ()=>{

  let [ContainerFiliere,setContainerFiliere]=useState("")


  useEffect(()=>{
    axios.get("/user/liste").then(res=>{
setContainerFiliere(res.data)

console.log(ContainerFiliere)

})
},[]
)

 

    const setting={
        dots:true,
        infinite:true,
        speed:500,
        slidesToShow:3,
        slidesToScroll:1

    }

    let navigate = useNavigate()

    return(
     
<div>

<h1 className={style.titre} > FORMATIONS </h1>
<Slider {...setting} className={style.slider}>
            

{ContainerFiliere && ContainerFiliere.map((element,index)=>{
  return(
    <div key={index}>
    <section className={style.section}  >
    <div className={style.imges}></div>
      <h2>{element.nom_filiere}</h2>
        <p>{element.description_filiere}</p>
        <button > <Link to={`${element.id_filiere}`}>En savoir plus</Link></button>
      </section>
      </div>
  )
})}
  
          

</Slider> 
</div>
      

       
 /*    </div> */
    )
}

export default Filiere;