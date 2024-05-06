const getUserDataFromToken = () => {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = JSON.parse(token);
            console.log('Decoded Token:', decodedToken); // Log decoded token to check its structure

            const userId = decodedToken?.id;
            const name = decodedToken?.username;
            const role = decodedToken?.role;
            return { userId, name, role };
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error parsing token:', error);
        return null;
    }
};
export default getUserDataFromToken;


  // Now you can use getUserDataFromToken wherever needed
  const userData = getUserDataFromToken();
  console.log('Token:', localStorage.getItem('token'));
  if (userData) {
    console.log('User ID:', userData.userId);
    console.log('Name:', userData.name);
    console.log('Role:', userData.role);
  } else {
    console.log('Token not found in local storage');
  }