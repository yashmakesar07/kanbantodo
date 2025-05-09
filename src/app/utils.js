import { nanoid } from "nanoid";

export const users = [
  {
    id: "unassigned",
    name: "UnAssigned",
  },
  {
    id: nanoid(),
    name: "John Doe",
  },
  {
    id: nanoid(),
    name: "Jane Smith",
  },
  {
    id: nanoid(),
    name: "Mike Johnson",
  },
  {
    id: nanoid(),
    name: "Sarah Williams",
  },
  {
    id: nanoid(),
    name: "David Brown",
  },
  {
    id: nanoid(),
    name: "Emily Chen",
  },
  {
    id: nanoid(),
    name: "Alex Rodriguez",
  },
];

export const loadState = () => {
  try {
    let data = localStorage.getItem("state");
    if (!data) {
      return undefined;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error("error while loading state", error);
  }
};

export const saveState = (state) => {
  try {
    localStorage.setItem("state", JSON.stringify(state));
  } catch (error) {
    console.error("error while saving state", error);
  }
};
