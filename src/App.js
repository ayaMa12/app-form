// React.lazy
// وظيفته: يسمح بعمل code-splitting على مستوى المكون، يعني تحميل المكون بشكل lazy عند الحاجة فقط بدل ما يتم تحميله مع الباندل الرئيسي.
// المبدأ: المكون يتحمل ديناميكيًا عند الحاجة، عادة مع import().
// الاستخدام: فقط مع مكونات React، مش مع أي وظيفة.
// المكون ده مش محتاج يتحمل دلوقتي، احمله بس لما المستخدم يفتحه.
//  fallbackلا يظهر أي شيء أثناء التحميل. لو المستخدم فتح الصفحة بسرعة، مش هيشوف حاجة.غير ال مهم: lazy
// Suspense
// وظيفته: يعمل كـ غلاف (wrapper) حول أي مكون lazy أو أي عملية تحتاج وقت تحميل.
// المبدأ: يعرض fallback UI (زي Loading spinner أو نص "Loading...") لحد ما المكون يكتمل تحميله.
// الاستخدام: لازم يكون حول أي مكون lazy.
// fallback ده اللي المستخدم هيشوفه أثناء تحميل المكون.
// بدون Suspense → React هيدي Error.
import { lazy, Suspense, useEffect } from "react";
import "./App.css";
import { DataInput } from "./components/Data";
import { AllDataContext } from "./context/ContextData";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { ForgotPassword } from "./components/ForgotPassword";
const Dashbord = lazy(() => import("./components/Dashbord"));
const LogIn = lazy(() => import("./components/Login"));
const AllAccount = lazy(() => import("./components/AllAccount"));
const ConfirmPass = lazy(() => import("./components/ConfirmPass"));
// lazy & suspence fallback لانها بحاجة ال ال suspence لاتعمل من غي ال Lazy لابد من عملهم معا لان ال
// suspence  lazy يعمل كفلاف حزل اي مكون
function App() {
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
        <Suspense
          fallback={
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <CircularProgress />
            </Box>
          }
        >
          <Routes>
            <Route path="/" element={<LogIn />} />

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
