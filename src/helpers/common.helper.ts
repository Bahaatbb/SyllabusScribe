import {jwtDecode} from 'jwt-decode';

export const debounce = (func: any, wait: number, immediate: boolean = false) => {
  let timeout: any;

  return function executedFunction(...args: any) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func(...args);
  };
};

const userAgent = navigator.userAgent;
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

export const API_BASE_URL = 'http://localhost:8000';
export const IS_MOBILE = isMobile;

export const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds

    // Check if the token is expired by comparing the expiration time with the current time
    return decodedToken.exp < currentTime;
  } catch (error) {
    // Handle the case where token decoding fails
    // For example, log the error or return true to indicate token expiration
    return true;
  }
}
