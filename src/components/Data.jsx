import { Box, Button, FormLabel } from "@mui/material";
import { useReducer, useState } from "react";
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

  const API_URL =
    "https://6a7f227b3183f5fd884ae93f.mockapi.io/api/v1/users";

  async function CreateAccount() {
    // 1️⃣ التأكد إن كل البيانات موجودة
    if (!input.userName || !input.password || !input.email) {
      setPopupMessage("Please fill all fields.");
      setOpenPopup(true);
      return;
    }

    // 2️⃣ التأكد من قوة الباسورد
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@&*]).{8,}$/;

    if (!passwordRegex.test(input.password)) {
      setPopupMessage(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character (@, &, *)."
      );

      setOpenPopup(true);
      return;
    }

    try {
      // 3️⃣ جلب كل المستخدمين من MockAPI
      const response = await axios.get(API_URL);

      const users = response.data;

      // 4️⃣ التأكد إن الـ username مش مستخدم
      // const userNameExists = users.some(
      //   (user) =>
      //     user.userName.toLowerCase() === input.userName.toLowerCase()
      // );

      // if (userNameExists) {
      //   setPopupMessage("This username is already used.");
      //   setOpenPopup(true);
      //   return;
      // }

      // 5️⃣ التأكد إن الـ email مش مستخدم
      const emailExists = users.some(
        (user) =>
          user.email.toLowerCase() === input.email.toLowerCase()
      );

      if (emailExists) {
        setPopupMessage("This email is already used.");
        setOpenPopup(true);
        return;
      }

      // 6️⃣ إنشاء المستخدم
      const newUser = await axios.post(API_URL, input);

      // 7️⃣ إضافته للـ reducer
      dispatch({
        type: "ADD",
        payload: newUser.data,
      });

      // 8️⃣ حفظ المستخدم الحالي
      localStorage.setItem(
        "currentUser",
        JSON.stringify(newUser.data)
      );

     localStorage.setItem("isLoggedIn", "true");

const savedAccounts =
  JSON.parse(localStorage.getItem("savedAccounts")) || [];

if (!savedAccounts.includes(newUser.data.id)) {
  savedAccounts.push(newUser.data.id);

  localStorage.setItem(
    "savedAccounts",
    JSON.stringify(savedAccounts)
  );
}

console.log("CREATE SUCCESS");
console.log("newUser:", newUser.data);
console.log("Going to Home");

navigate("/Home");

      // 🔟 تنظيف الـ inputs
      setInput({
        userName: "",
        password: "",
        email: "",
        image: "",
      });
    } catch (error) {
      console.log(error);

      setPopupMessage(
        "Something went wrong. Please try again."
      );

      setOpenPopup(true);
    }
  }

  function changeValueName(value) {
    setInput({
      ...input,
      userName: value,
    });
  }

  function changeValuePassword(value) {
    setInput({
      ...input,
      password: value,
    });
  }

  function changeValueEmail(value) {
    setInput({
      ...input,
      email: value,
    });
  }

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          CreateAccount();
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
            background:
              "linear-gradient(135deg, #ffffff, #f0f4f8)",
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
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    edge="end"
                  >
                    {showPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
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
              background:
                "linear-gradient(135deg, #1976d2, #42a5f5)",
              textTransform: "none",
              transition: "0.3s",

              "&:hover": {
                background:
                  "linear-gradient(135deg, #1565c0, #1e88e5)",
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