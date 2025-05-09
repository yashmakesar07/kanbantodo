import { users } from "../app/utils";

export function stringToColor(string) {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

export function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        height: "30px",
        width: "30px",
        fontSize: "15px",
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

// export const getUsername = (id) => {
//  return users.find((user) => (id === user.id ? user.name : null))    
// }
