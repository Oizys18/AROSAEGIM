import axios from "axios";
// root에 .env.development, REACT_APP_APIKEY 설정 필요

// lat + lng -> W3W
export function CtoW(lat, lng) {
  const url = "https://api.what3words.com/v3/convert-to-3wa?coordinates=";
  const APIKEY = process.env.REACT_APP_W3W_API;
  return axios.get(url + lat + "," + lng + "&language=ko&key=" + APIKEY);
}
export default CtoW;

// // W3W -> lat + lng
// export function WtoC(word1, word2, word3) {
//   const url = "https://api.what3words.com/v3/convert-to-coordinates?words=";
//   const APIKEY = process.env.REACT_APP_APIKEY;
//   return axios.get(url + word1 + "." + word2 + "." + word3 + "&key=" + APIKEY);
// }
// export default WtoC;
