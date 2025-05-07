import { Container } from "@mui/material";
import React from "react";
import Column from "./Column";
import { useSelector } from "react-redux";

const Board = () => {
  const columns = useSelector((state) => state.todo.columns); // get from redux

  return (
    <Container
      sx={{
        backgroundColor: "grey",
        height: "700px",
        p: "10px",
        width: "1200px",
        display: "flex",
        flexDirection: "row",
        gap: "5px",
        overflow: "scroll",
        borderRadius: 2,
      }}
      disableGutters
      fixed
    >
      {Object.entries(columns).map(([name, tasks]) => (
        <Column key={name} name={name} tasks={tasks} />
      ))}
    </Container>
  );
};

export default Board;
