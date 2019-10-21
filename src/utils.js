export const getUniqId = () => {
  return Math.floor(Math.random() * 1000000);
};

export const getColorPriority = priority => {
  switch (priority) {
    case "5": {
      return "red";
    }
    case "4": {
      return "yellow";
    }
    case "3": {
      return "blue";
    }
    case "2": {
      return "light-blue";
    }
    case "1": {
      return "green";
    }
    default: {
      return "green";
    }
  }
};
