import { jwtDecode } from "jwt-decode";


const getUserDataFromToken = () => {
    try {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            const token = JSON.parse(storedToken);
            console.log('Decoded Token:', token); 
            // Log decoded token to check its structure
            const decodedToken = jwtDecode(token); // Decode the token
            console.log('Decoded Token:', decodedToken); // Log decoded token to check its structure
        
            if (decodedToken) {
                const userId = decodedToken.id;
                const name = decodedToken.username;
                const role = decodedToken.role;
                return { userId, name, role };
            } else {
                console.error('Failed to decode token');
                // Handle token decoding failure
            }
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error parsing token:', error);
        return null;
    }
};
export default getUserDataFromToken;


  