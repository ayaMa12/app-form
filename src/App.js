import { lazy, Suspense, useEffect } from 'react';
import './App.css';
import { DataInput } from './components/Data';
import { AllDataContext } from './context/ContextData';
import { Routes, Route, useNavigate } from "react-router-dom";
import { Box, CircularProgress } from '@mui/material';
import { ForgotPassword } from './components/ForgotPassword';
 const Dashbord=lazy(()=>import ( './components/Dashbord'));
const LogIn=lazy(()=>import ( './components/Login'));
const AllAccount=lazy(()=>import ( './components/AllAccount'));
const ConfirmPass=lazy(()=>import ( './components/ConfirmPass'));
 
   function App(){
    const navigate = useNavigate();
    useEffect(() => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (isLoggedIn === "true") {
        navigate("/Home");
      }
      
    }, [navigate]);

  return (
    <div className="App">
     
      <AllDataContext>
       <Suspense fallback={<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
              <CircularProgress />
            </Box>}>
          <Routes>
                  <Route path="/" element={ <LogIn /> } />
                  <Route path="/Login" element={<DataInput />} />
                  <Route path="/AllAccount" element={<AllAccount />} />
                  <Route path="/ConfirmPass" element={<ConfirmPass />} />
                                    <Route path="/ForgotPassword" element={<ForgotPassword />} />
                  <Route path="/Home" element={<Dashbord />} />

         </Routes>
                </Suspense>
    </AllDataContext>
      
    </div>
  );
}

export default App;
