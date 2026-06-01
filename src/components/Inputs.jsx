import { TextField } from "@mui/material";
import { useContext } from "react";
import { DataInput2 } from "../context/ContextData";

export function Inputs() {
    const { input, changeValue , id, type,endAdornment }=useContext(DataInput2)
  return (
    <>
      <TextField
        id={id}
        type={type}
        value={input}
        onChange={(event) =>changeValue(event.target.value)}
          
        InputProps={{
          endAdornment:endAdornment,
        }}
      />
    </>
  );
}
