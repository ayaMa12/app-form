import { Box, Button, FormLabel } from "@mui/material";
import { useReducer, useState, useEffect } from "react";
import { DataInput2, useData } from "../context/ContextData";
import { Inputs } from "./Inputs";
import DataReducer from "../Reducer/DataReducer";
import { useNavigate } from "react-router-dom";
import CustomPopup from "./Popout";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";

export function DataInput() {
  const navigate = useNavigate();
  const InputData = useData();
  const [state, dispatch] = useReducer(DataReducer, InputData);
  const [openPopup, setOpenPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [input, setInput] = useState({
    userName: "",
    password: "",
    email: "",
    image: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  // كل اليوزرز
  const [users, setUsers] = useState([]);
  // const AllData = state.map((item) => {
  //   return (
  //     <li key={item.id}>
  //       ({item.id})==={item.userName}==={item.email}
  //       <br />
  //       {item.password}
  //     </li>
  //   );
  // });

  async function Login() {
    if (!input.userName || !input.password || !input.email) {
      setPopupMessage("Please fill all field.");
      setOpenPopup(true);
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@&*]).{8,}$/;

    if (!passwordRegex.test(input.password)) {
      setPopupMessage(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character (@, &, *).",
      );

      setOpenPopup(true);
      return;
    }

    try {
      // هل اليوزر موجود بالفعل
      const response = await axios.get(
        `http://localhost:5000/users?userName=${input.userName}&password=${input.password}&email=${input.email}`,
      );

      // لو موجود → Login
      if (response.data.length > 0) {
        const user = response.data[0];

        if (!state.find((u) => u.id === user.id)) {
          dispatch({ type: "ADD", payload: user });
        }

        localStorage.setItem("currentUser", JSON.stringify(user));

        localStorage.setItem("isLoggedIn", "true");

        navigate("/Home");
      } else {
        // التحقق هل الايميل مستخدم
        const emailExists = users.find((u) => u.email === input.email);

        if (emailExists) {
          alert("هذا الايميل مستخدم من قبل");
          return;
        }

        // إنشاء حساب جديد
        const newUser = await axios.post("http://localhost:5000/users", input);

        dispatch({
          type: "ADD",
          payload: newUser.data,
        });

        localStorage.setItem("currentUser", JSON.stringify(newUser.data));

        localStorage.setItem("isLoggedIn", "true");

        navigate("/Home");
      }
    } catch (error) {
      console.log(error);
    }

    setInput({
      userName: "",
      password: "",
      email: "",
    });
  }

  function changeValueName(value) {
    setInput({ ...input, userName: value });
  }

  function changeValuePassword(value) {
    setInput({ ...input, password: value });
  }

  function changeValueEmail(value) {
    setInput({ ...input, email: value });
  }

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (currentUser && isLoggedIn === "true") {
      navigate("/Home");
    }
  }, [navigate]);

  // جلب كل اليوزرز
  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((res) => setUsers(res.data))
      .catch(console.log);
  }, []);

  return (
    <>
      {/* <ul>{AllData}</ul> */}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          Login();
        }}
      >
        <CustomPopup
          open={openPopup}
          onClose={() => setOpenPopup(false)}
          title="Error"
          message={popupMessage}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "350px",
            mx: "auto",
            mt: "80px",
            gap: "15px",
            padding: "30px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #ffffff, #f0f4f8)",
            boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
            textAlign: "start",
            transition: "0.3s",
            "&:hover": {
              boxShadow: "0 10px 35px rgba(0,0,0,0.25)",
            },
          }}
        >
          <FormLabel
            htmlFor="name"
            sx={{
              fontWeight: "600",
              color: "#333",
              fontSize: "14px",
            }}
          >
            UserName
          </FormLabel>
          <DataInput2.Provider
            value={{
              type: "text",
              id: "name",
              input: input.userName,
              changeValue: changeValueName,
            }}
          >
            <Inputs />
          </DataInput2.Provider>

          <FormLabel
            htmlFor="password"
            sx={{
              fontWeight: "600",
              color: "#333",
              fontSize: "14px",
            }}
          >
            Password
          </FormLabel>
          <DataInput2.Provider
            value={{
              type: showPassword ? "text" : "password",
              id: "password",
              input: input.password,
              changeValue: changeValuePassword,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}{" "}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          >
            <Inputs />
          </DataInput2.Provider>

          <FormLabel
            htmlFor="E_mail"
            sx={{
              fontWeight: "600",
              color: "#333",
              fontSize: "14px",
            }}
          >
            Email
          </FormLabel>
          <DataInput2.Provider
            value={{
              type: "email",
              id: "E_mail",
              input: input.email,
              changeValue: changeValueEmail,
            }}
          >
            <Inputs />
          </DataInput2.Provider>

          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: "10px",
              padding: "10px",
              borderRadius: "8px",
              fontWeight: "bold",
              background: "linear-gradient(135deg, #1976d2, #42a5f5)",
              textTransform: "none",
              transition: "0.3s",
              "&:hover": {
                background: "linear-gradient(135deg, #1565c0, #1e88e5)",
                transform: "scale(1.03)",
              },
            }}
          >
            Create Account
          </Button>
        </Box>
      </form>
    </>
  );
}
