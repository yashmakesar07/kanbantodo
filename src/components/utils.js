
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

export function stringAvatar(name, isSelected = false) {
  if (!name) {
    return {
      sx: {
        bgcolor: '#808080',
        height: "40px",
        width: "40px",
        fontSize: "15px",
        border: isSelected ? '10px solid black' : '10px solid transparent',
      },
      children: '?',
    };
  }

  const nameParts = name.split(" ");
  const children = nameParts.length > 1
    ? `${nameParts[0][0]}${nameParts[1][0]}`
    : nameParts[0][0];

  return {
    sx: {
      bgcolor: stringToColor(name),
      height: "30px",
      width: "30px",
      fontSize: "12px",
      border: isSelected ? '5px solid royalblue' : '5px solid transparent',
    },
    children: children,
  };
}


// export const getUsername = (id) => {
//  return users.find((user) => (id === user.id ? user.name : null))    
// }
