import Axios from "axios";

export default Axios.create({
  baseURL: 'https://event-tracker-16b40.firebaseio.com',
})