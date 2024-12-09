import jwtDecode from 'jwt-decode';

export function isTokenExpired(token: string): boolean {
  if (!token) return true; // If no token, consider it expired.
  
  const decoded: { exp: number } = jwtDecode(token); // Decode the token.
  const currentTime = Date.now() / 1000; // Current time in seconds.
  
  return decoded.exp < currentTime; // Check if the token is expired.
}
