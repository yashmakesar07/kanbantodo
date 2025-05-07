import { Container } from "@mui/material";
import React from "react";
import Column from "./Column";

const Board = () => {
  const data = {
    columns: [
      { id: 1, title: "TO-DO", tasks: [] },
      { id: 2, title: "In Progress", tasks: [] },
      { id: 3, title: "Completed", tasks: [] },
      { id: 4, title: "Deleted", tasks: [] }
    ]
  };

  return (
    <Container
      sx={{
        backgroundColor: "grey",
        height: "600px",
        p: "10px",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        gap: "5px",
        borderRadius: 2,
      }}
      disableGutters
      fixed
    >
      {data.columns.map((column) => (
        <Column key={column.id} name={column.title} tasks={column.tasks} />
      ))}
    </Container>
  );
};

export default Board;
