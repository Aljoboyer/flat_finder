export const getLocalStorageData = () => {
  if (typeof window === 'undefined') return null; // SSR-safe

  const userDataRaw = localStorage.getItem('ff_user');
  try {
    const userData = JSON.parse(userDataRaw || '{}');
    
    return userData?.result || null;
  } catch (err) {
    console.error('Error parsing ff_user:', err);
    return null;
  }
};
