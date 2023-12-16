import axios from "axios";
import RootLayout from "./components/Layout/RootLayout";
import { useUserToken } from "./utils/hooks";

const App = () => {
  // redux
  const userToken = useUserToken();

  // setting default axios token
  axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;

  return (
    <>
      <RootLayout />
    </>
  );
};

export default App;
