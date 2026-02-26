import { HeadProvider } from "react-head";
import Paths from "./routes/Paths";

const App = () => {
  return (
    <HeadProvider>
      <Paths />
    </HeadProvider>
  );
}

export default App;