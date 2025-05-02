export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  export const getInitial = (name) => {
    if (!name) return "";
  
    const words = name.trim().split(" ");
  
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
  
    // Take the first letter of the first two words
    return (
      words[0].charAt(0).toUpperCase() +
      words[1].charAt(0).toUpperCase()
    );
  };
  