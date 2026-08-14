// Dashbord.jsx

import { Box } from "@mui/material";
import axios from "axios";
import { memo, useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Material UI
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
  Avatar,
  Badge,
} from "@mui/material";

// Icons
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AddIcon from "@mui/icons-material/Add";

// Dialog
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

// ======================================================
// SimpleDialog
// ======================================================

function SimpleDialog({
  onClose,
  open,
  users,
}) {
  const navigate = useNavigate();

  function switchAccount() {
    localStorage.removeItem("currentUser");
    localStorage.setItem("isLoggedIn", "false");

    navigate("/login");
  }

  function handleSelect(user) {
    onClose(user);
  }

  return (
    <Dialog
      onClose={() => onClose(null)}
      open={open}
    >
      <DialogTitle>
        Set backup account
      </DialogTitle>

      <List>
        {users.map((account) => (
          <ListItem
            disablePadding
            key={account.id}
          >
            <ListItemButton
              onClick={() => handleSelect(account)}
            >
              <ListItemAvatar>
                <Tooltip title={account?.userName || ""}>
                  <Avatar
                    src={account?.image || ""}
                    sx={{
                      bgcolor: "#0097a7",
                      width: 40,
                      height: 40,
                    }}
                  >
                    {!account?.image &&
                      account?.userName
                        ?.split(" ")
                        .slice(0, 2)
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                  </Avatar>
                </Tooltip>
              </ListItemAvatar>

              <ListItemText
                primary={account.email}
                secondary={account.userName
                  ?.split(" ")
                  .map(
                    (n) =>
                      n.charAt(0).toUpperCase() +
                      n.slice(1).toLowerCase()
                  )
                  .join(" ")}
              />
            </ListItemButton>
          </ListItem>
        ))}

        {/* Add Account */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              onClose(null);
              switchAccount();
            }}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>

            <ListItemText primary="Add account" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

// ======================================================
// Dashboard
// ======================================================

function Dashbord() {
  const navigate = useNavigate();
  const location = useLocation();

  const API_URL =
    "https://6a7f227b3183f5fd884ae93f.mockapi.io/api/v1/users";

  // User القادم من location
  const stateUser = location.state?.user;

  // Current User
  const [user, setUser] = useState(stateUser || null);

  // All saved accounts
  const [users, setUsers] = useState([]);

  // Dialog
  const [open, setOpen] = useState(false);

  // File input
  const fileInputRef = useRef(null);

  // ======================================================
  // فتح Dialog الحسابات
  // ======================================================

  function handleClickOpen() {
    setOpen(true);
  }

  // ======================================================
  // غلق Dialog واختيار حساب
  // ======================================================

  function handleClose(value) {
    setOpen(false);

    if (value) {
      setUser(value);

      localStorage.setItem(
        "currentUser",
        JSON.stringify(value)
      );

      localStorage.setItem(
        "isLoggedIn",
        "true"
      );
    }
  }

  // ======================================================
  // جلب المستخدم الحالي
  // ======================================================

  useEffect(() => {
    const currentUser =
      JSON.parse(
        localStorage.getItem("currentUser")
      ) || null;

    const isLoggedIn =
      localStorage.getItem("isLoggedIn");

    if (
      currentUser &&
      isLoggedIn === "true"
    ) {
      setUser(currentUser);
    } else {
      navigate("/");
    }
  }, [navigate]);

  // ======================================================
  // جلب الحسابات المحفوظة
  // ======================================================

  useEffect(() => {
    const savedAccounts =
      JSON.parse(
        localStorage.getItem("savedAccounts")
      ) || [];

    axios
      .get(API_URL)
      .then((res) => {
        const savedUsers =
          res.data.filter((account) =>
            savedAccounts.includes(account.id)
          );

        setUsers(savedUsers);
      })
      .catch((error) => {
        console.log(
          "Get users error:",
          error
        );
      });
  }, []);

  // ======================================================
  // Delete Account
  // ======================================================

  function Delete() {
    const currentUser =
      JSON.parse(
        localStorage.getItem("currentUser")
      );

    if (!currentUser) return;

    const confirmDelete =
      window.confirm(
        `Are you sure you want to delete Your Account? "${currentUser.userName}"`
      );

    if (!confirmDelete) return;

    axios
      .delete(
        `${API_URL}/${currentUser.id}`
      )
      .then(() => {
        // حذف من savedAccounts
        const savedAccounts =
          JSON.parse(
            localStorage.getItem(
              "savedAccounts"
            )
          ) || [];

        const updatedAccounts =
          savedAccounts.filter(
            (id) => id !== currentUser.id
          );

        localStorage.setItem(
          "savedAccounts",
          JSON.stringify(updatedAccounts)
        );

        // حذف current user
        localStorage.removeItem(
          "currentUser"
        );

        localStorage.removeItem(
          "isLoggedIn"
        );

        navigate("/");
      })
      .catch((error) => {
        console.log(
          "Delete error:",
          error
        );
      });
  }

  // ======================================================
  // Logout
  // ======================================================

  function Logout() {
    localStorage.removeItem(
      "currentUser"
    );

    localStorage.setItem(
      "isLoggedIn",
      "false"
    );

    navigate("/");
  }

  // ======================================================
  // فتح اختيار الصورة
  // ======================================================

  function handleOpenFile(e) {
    if (e) {
      e.stopPropagation();
    }

    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  // ======================================================
  // تغيير صورة Avatar
  // ======================================================

  function handleFileChange(e) {
    const file =
      e.target.files[0];

    console.log("FILE:", file);
    console.log("USER:", user);

    if (!file) return;

    if (!user?.id) {
      console.log(
        "No user ID!"
      );
      return;
    }

    // التأكد من نوع الصورة
    if (!file.type.startsWith("image/")) {
      alert(
        "Please select an image file."
      );

      e.target.value = "";
      return;
    }

    const reader =
      new FileReader();

    reader.onload = (event) => {
      const img =
        new Image();

      img.src =
        event.target.result;

      img.onload = async () => {
        try {
          // ==========================================
          // إنشاء Canvas لضغط الصورة
          // ==========================================

          const canvas =
            document.createElement(
              "canvas"
            );

          const MAX_WIDTH = 200;

          const scaleSize =
            MAX_WIDTH /
            img.width;

          canvas.width =
            MAX_WIDTH;

          canvas.height =
            img.height *
            scaleSize;

          const ctx =
            canvas.getContext(
              "2d"
            );

          ctx.drawImage(
            img,
            0,
            0,
            canvas.width,
            canvas.height
          );

          // ==========================================
          // تحويل الصورة إلى Base64
          // ==========================================

          const compressedBase64 =
            canvas.toDataURL(
              "image/jpeg",
              0.7
            );

          console.log(
            "Image size:",
            compressedBase64.length
          );

          // ==========================================
          // تحديث MockAPI
          // ==========================================

          const response =
            await axios.put(
              `${API_URL}/${user.id}`,
              {
                ...user,
                image:
                  compressedBase64,
              }
            );

          const updatedUser =
            response.data;

          console.log(
            "Image Saved ✅",
            updatedUser
          );

          // ==========================================
          // تحديث currentUser
          // ==========================================

          setUser(
            updatedUser
          );

          localStorage.setItem(
            "currentUser",
            JSON.stringify(
              updatedUser
            )
          );

          // ==========================================
          // تحديث قائمة الحسابات
          // ==========================================

          setUsers(
            (prevUsers) =>
              prevUsers.map(
                (account) =>
                  account.id ===
                  updatedUser.id
                    ? updatedUser
                    : account
              )
          );

        } catch (error) {
          console.log(
            "Image save error:",
            error
          );

          alert(
            "Image could not be saved."
          );
        }
      };
    };

    reader.readAsDataURL(file);

    // مهم جدًا لو اخترت نفس الصورة مرة ثانية
    e.target.value = "";
  }

  // ======================================================
  // JSX
  // ======================================================

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #1e3c72, #2a5298)",
        gap: "30px",
        paddingTop: "80px",
      }}
    >

      {/* ==================================================
          Hidden File Input
      ================================================== */}

      <input
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        ref={fileInputRef}
        style={{
          display: "none",
        }}
        onChange={
          handleFileChange
        }
      />

      {/* ==================================================
          Navbar
      ================================================== */}

      <AppBar position="fixed">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent:
              "space-between",
          }}
        >

          <Typography variant="h6">
            Dashboard
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >

            {/* Delete */}

            <Tooltip title="Delete">
              <IconButton
                onClick={Delete}
                sx={{
                  color: "red",
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>

            {/* Logout */}

            <Tooltip title="Logout">
              <IconButton
                onClick={Logout}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>

            {/* ==================================================
                Avatar
                مهم:
                هنا مش بنحط IconButton جوه IconButton
            ================================================== */}

            <Tooltip
              title={
                user?.userName || ""
              }
            >
              <Box
                sx={{
                  position:
                    "relative",
                  width: 48,
                  height: 48,
                  display: "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                }}
              >

                {/* Avatar */}

                <Avatar
                  src={
                    user?.image || ""
                  }
                  sx={{
                    bgcolor:
                      "#0097a7",
                    width: 40,
                    height: 40,
                    cursor:
                      "pointer",
                  }}
                  onClick={
                    handleClickOpen
                  }
                >
                  {!user?.image &&
                    user?.userName
                      ?.split(" ")
                      .slice(0, 2)
                      .map(
                        (n) =>
                          n[0]
                      )
                      .join("")
                      .toUpperCase()}
                </Avatar>

                {/* ==================================================
                    زرار تغيير الصورة
                ================================================== */}

                <IconButton
                  size="small"
                  onClick={
                    handleOpenFile
                  }
                  sx={{
                    position:
                      "absolute",

                    bottom: 0,
                    right: 0,

                    backgroundColor:
                      "#1976d2",

                    width: 25,
                    height: 25,

                    padding: 0,

                    zIndex: 2,

                    "&:hover": {
                      backgroundColor:
                        "#1565c0",
                    },
                  }}
                >
                  <AddAPhotoIcon
                    sx={{
                      color:
                        "#fff",
                      fontSize: 16,
                    }}
                  />
                </IconButton>

              </Box>
            </Tooltip>

          </Box>
        </Toolbar>
      </AppBar>

      {/* ==================================================
          Hello
      ================================================== */}

      <h1
        style={{
          background:
            "#fff",
          padding:
            "20px",
          borderRadius:
            "12px",
        }}
      >
        Hello{" "}

        {user?.userName
          ?.split(" ")
          .map(
            (n) =>
              n.charAt(
                0
              ).toUpperCase() +
              n
                .slice(1)
                .toLowerCase()
          )
          .join(" ")}{" "}

        👋
      </h1>

      {/* ==================================================
          Dialog
      ================================================== */}

      <SimpleDialog
        open={open}
        onClose={handleClose}
        users={users}
      />

    </Box>
  );
}

export default memo(
  Dashbord
);