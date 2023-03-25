import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

import Navbar from "./Components/Navbar/Navbar";
import { MainRoutes } from "./Pages/MainRoutes";

function App() {
  return (
    <div className="App">

      <Navbar />
      <MainRoutes />
    

    </div>
  );
}

export default App;
