export const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      resolve, reject,
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: Infinity,
      }
    );
  });
}