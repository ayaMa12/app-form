import {   useEffect, useState  } from "react";
import axios from "axios";
// Dialog imports
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
// Material UI imports
import { Tooltip, Avatar, Badge ,IconButton} from "@mui/material";
// import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
// import Dashbord from "./Dashbord";
 export default function AllAccount() {
  const navigate = useNavigate();
  function switchAccount() {
    localStorage.removeItem("currentUser");
    localStorage.setItem("isLoggedIn", "false");
    navigate("/login");
  }
  const handleSelect = (user) => {
 
  localStorage.setItem("currentUser", JSON.stringify(user));
  // localStorage.setItem("isLoggedIn", "true");
//  react-router بتاع  state ولكن بعتاة props  هنا مش بعتاه من خلال 
  // navigate("/Home", { state: { user } });
  navigate("/ConfirmPass")
};
  // كل اليوزرز
    const [users, setUsers] = useState([]);
  // جلب كل اليوزرز
    useEffect(() => {
  const savedAccounts =
    JSON.parse(localStorage.getItem("savedAccounts")) || [];

  axios
    .get("https://6a7f227b3183f5fd884ae93f.mockapi.io/api/v1/users")
    .then((res) => {
      const savedUsers = res.data.filter((user) =>
        savedAccounts.includes(user.id)
      );

      setUsers(savedUsers);
    })
    .catch(console.log);
}, []);
  
  return (
    <div className="all-account">
      <h1 sx={{ textAlign: "center" }}>All Accounts</h1>
      <List >
        {users.map((user) => (
          <ListItem disablePadding key={user.id} sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" ,textAlign:"center",border :"1px solid #9e9c9cff",borderRadius:"10px",marginBottom:"10px"}}>  
            <ListItemButton
              onClick={() => {
                handleSelect(user);
              }}
            >
              <ListItemAvatar>
                <Tooltip title={user?.userName}>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();

                    //   setSelectedUser(user);

                      setTimeout(() => {
                        // handleOpenFile();
                      }, 0);
                    }}
                  >
                    <Badge
                      overlap="circular"
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                    //   badgeContent={<AddAPhotoIcon />}
                    >
                      <Avatar
                        src={user?.image || ""}
                        sx={{
                          bgcolor: "#0097a7",
                          width: 40,
                          height: 40,
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        {!user?.image &&
                          user?.userName
                            ?.split(" ")
                            .slice(0, 2)
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                      </Avatar>
                    </Badge>
                  </IconButton>
                </Tooltip>
              </ListItemAvatar>
              <ListItemText primary={user.email} secondary={user.userName?.split(" ")
          .map((n) => n.charAt(0).toUpperCase() + n.slice(1).toLowerCase())
          .join(" ")}/>
            </ListItemButton>
          </ListItem>
        ))}

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
            //   onClose(null);
              switchAccount();
            }}
          >
            {" "}
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
}
