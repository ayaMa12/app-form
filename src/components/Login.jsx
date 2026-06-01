import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
export default function LogIn() {
  const navgate = useNavigate();

  // كل اليوزرز
  const [users, setUsers] = useState([]);
  // جلب كل اليوزرز
  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((res) => setUsers(res.data))
      .catch(console.log);
  }, []);
  function Log() {
    if (users.length === 0) {
      navgate("/Login");
    } else {
      navgate("/AllAccount");
    }
  }
  return (
    <>
      <Button onClick={() => Log()} variant="contained">
        Login
      </Button>
    </>
  );
}
