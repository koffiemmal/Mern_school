const database = require("../Config/mysql")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config();
exports.signup = (req, res)=>{

    let insertUser = " insert into user (id_role,nom_user,prenom_user,email_user,age_user,pays_user,motdepasse_user) VALUES(?,?,?,?,?,?,?)";
    bcrypt.hash(req.body.motdepasse_user,6)
    .then((hash)=>{
        database.query(insertUser,[req.body.id_role,req.body.nom_user,req.body.prenom_user,req.body.email_user,req.body.age_user,req.body.pays_user,hash],(error,result)=>{
            if (error) {
                console.log(error);
                res.status(500).json({ error: "Une erreur s'est produite lors de l'inscription." });
            } else {
                console.log(req.body);
                res.status(201).json({ hash: hash });
            }})
    })
    .catch((error)=>{
        console.log(error)
    })
  
}

exports.login = (req, res) => {
    let rechercheutilisateur = "SELECT * FROM user WHERE email_user = ?";
    
    database.query(rechercheutilisateur, [req.body.email_user], (error, result) => {
        if (error) {
            res.status(500).json(error);
            return;
        }

        if (result.length > 0) {
            const user = result[0];

            // Vérification du rôle
            if (user.id_role === 1) {
                console.log("Utilisateur");
                let id_user = user.id_user
              
               
                // Comparaison des mots de passe
                bcrypt.compare(req.body.motdepasse_user, user.motdepasse_user)
                    .then((valid) => {
                        if (valid) {
                            // Génération du jeton JWT
                            let accessToken = jwt.sign(
                                { id_user: user.id_user },
                                "12345678",
                                { expiresIn: "72h" }
                            );
                            res.status(200).json({accessToken,id_user});
                           
                        } else {
                            res.status(404).json({ error: "Mot de passe incorrect" });
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500).json({ error: "Erreur lors de la comparaison des mots de passe" });
                    });
            } 
        } else {

            // Aucun utilisateur trouvé avec l'e-mail spécifié
            res.status(404).json({ error: "Utilisateur introuvable" });
        }
    });
};

exports.liste=(req,res)=>{
    let requete="SELECT * FROM filiere";
    database.query(requete,(error,result)=>{
        res.status(203).json(result)
     
    })
}

exports.insertFiliere=(req,res)=>{
    let insert = "INSERT INTO filiere (nom_filiere,description_filiere) VALUES(?,?)"
    database.query(insert,[req.body.nom_filiere,req.body.description_filiere],(error,result)=>{
        if(error){
            console.log("insert invalid")
        }
        if(result){
            console.log("entrer des filiere")
        }
    })
}

exports.delete =(req,res)=>{
    let drop = "DELETE FROM filiere WHERE id_filiere = ?"
    database.query(drop,[req.body.id_filiere],(error,result)=>{
        if(error){
            console.log("suppresion irrealiser")
        }
        if(result){
            console.log("suppression faite")
            
        }
    })
}

exports.insertmatiere = (req, res) => {
    let insert = "INSERT INTO matiere (id_filiere, nom_matiere, duree_matiere, description_matiere, description2_matiere) VALUES (?, ?, ?, ?, ?)";
    database.query(insert, [req.body.id_filiere, req.body.nom_matiere, req.body.duree_matiere, req.body.description_matiere, req.body.description2_matiere], (error, result) => {
        if (error) {
            console.log("Matiere non entrer error:", error);
            res.status(500).json({ error: "Internal Server Error" }); // Return an error response to the client
        } else {
            console.log("Matiere entrer avec succes");
            res.status(200).json({ message: "Matiere inserted successfully" }); // Return a success response to the client
        }
    });
};

exports.getAll = (req,res)=>{
    let show = " SELECT matiere.id_matiere,matiere.nom_matiere,matiere.duree_matiere,nom_filiere FROM matiere JOIN filiere ON matiere.id_filiere = filiere.id_filiere; "
    database.query(show,(error,result)=>{
     res.status(203).json(result)

    })
}

exports.delMatiere = (req,res)=>{
    let del = "DELETE FROM matiere WHERE id_matiere = ?;"
    database.query(del,[req.body.id_matiere],(error,result)=>{
        if(result){
            res.status(203).json(`la matiere de l'id ${req.body.id_matiere} a été supprime`)
        }
        else{
            res.status(203).json("error")
        }
        if(error){
            console.log("error")
        }
    })
}

exports.getspecifyMatiere = (req,res)=>{
    let specify = " SELECT matiere.nom_matiere,matiere.duree_matiere,matiere.description_matiere,matiere.description2_matiere FROM matiere JOIN filiere ON matiere.id_filiere = filiere.id_filiere WHERE filiere.id_filiere = ?;"
    database.query(specify,[req.body.id_filiere],(error,result)=>{
     res.status(203).json(result)
     console.log(result)
    })
}

exports.getFiliereName =(req,res)=>{
    let name = "SELECT nom_filiere FROM filiere WHERE id_filiere=?"
    database.query(name,[req.body.id_filiere],(error,result)=>{
        res.status(203).json(result)
    })
}

exports.loginAdmin =(req,res)=>{
    let rechercheAdmin = "SELECT * FROM user WHERE email_user = ?";

    database.query(rechercheAdmin,[req.body.email_user],(error,result)=>{
        if(error){
            res.status(500).json(error)
return;
        }
        if(result.length>0){

            const user =result[0];

            if(user.id_role === 2){
                console.log("Administrateur");


                bcrypt.compare(req.body.motdepasse_user,user.motdepasse_user)
                .then((valid)=>{
                    if(valid){
                        let accessToken = jwt.sign(
                            { id_user: user.id_user },
                            "12345678",
                            { expiresIn: "72h" }
                        );
                       
                        res.status(200).json({ accessToken });
                       

                    }else{
                        res.status(404).json({error :"Mot de passe incorrect"})
                        alert("Mot de passe incorrect")
                    }
                    
                })
                .catch((error)=>{
                    console.log(error);
                    res.status(404).json({ error: "Utilisateur introuvable" });
                  
                })
            }
        }
    })
}

exports.insertActivite =(req,res)=>{

let insert ="INSERT INTO article (nom_user,commentaire_article) VALUES(?,?);"

database.query(insert,[req.body.nom_user,req.body.commentaire_article],(error,result)=>{
    if(result){
        res.status(203).json("successufuly")
    }
    else{
        res.status(500).json(error)
    }
})
}

exports.getidForName=(req,res)=>{
    let rechercheAdmin = "SELECT * FROM user WHERE email_user = ?";
    database.query(rechercheAdmin,[req.body.email_user],(error,result)=>{
        res.status(203).json(result[0])
    })

}

exports.vieuw = (req,res)=>{

let show='SELECT * FROM article ;'

database.query(show,(error,result)=>{

    res.status(203).json(result)
    
})

}
exports.scearch_name=(req,res)=>{

    let search ="SELECT nom_user FROM user WHERE id_user=?;"

    database.query(search,req.body.id_user,(error,result)=>{
        res.status(203).json(result[0].nom_user)
    })
}

exports.delete_article=(req,res)=>{

    let drop ="DELETE FROM article WHERE id_article = ?;"

    database.query(drop,req.body.id_article ,(error,result)=>{
        if(error){
            res.status(500).json("suppression echouer")
        }
       if(result){
            res.status(203).json("success de la suppression du commentaire")
        }
    })

}

exports.suggestion=(req,res)=>{
let insert ="INSERT INTO suggetion (nom_suggetion,commentaire) VALUES(?,?)"

database.query(insert,[req.body.nom_suggetion,req.body.commentaire],(error,result)=>{
    if(result){
        res.status(201).json("sugession envoyé")

    }
    else{
        res.status(500).json("erreur d'envoi")
    }
})
}