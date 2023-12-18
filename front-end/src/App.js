import Header from "./Components/Layout/HomeLayout/Header";
import Acceuil from "./Components/Pages/Acceuil/Acceuil";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Filiere from "./Components/Pages/Filiere/Filiere";
import Cours from "./Components/Pages/Cours/Cours";
import Activite from "./Components/Pages/Activite/Activite";

import Chat from "./Components/Pages/Chat/Chat";
import Login from "./Components/Pages/Login/Login";
import Signin from "./Components/Pages/SignIN/Signin";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Admin from "./Components/Pages/Admin/Admin";
import Apropos from "./Components/Pages/Apropos/Apropos";



function App() {

  return (
  <BrowserRouter>
  
  <Routes>

<Route path="/" element={<Header/>}>
  <Route path="/" element={<Acceuil/>}/>

  <Route path="Filiere" element={<Filiere/>}/>
  <Route path="Filiere/:id_filiere" element={<ProtectedRoute/>}>
  <Route index element={<Cours/>}/>

  </Route>
  <Route path="Activite"element={<ProtectedRoute/>}>

<Route index element={<Activite/>}/>
  </Route>
  

  <Route path="Chat" element={<ProtectedRoute/>}>

<Route index element={<Chat/>}/>
  </Route>
  <Route path="Admin" element={<Admin/>}/>
<Route path="Login" element={<Login/>}/>
<Route path="Signin" element={<Signin/>}/>
<Route path="Apropos" element={<Apropos/>}/>
</Route>






  </Routes>
  
  </BrowserRouter>
  )
 
}

export default App;
