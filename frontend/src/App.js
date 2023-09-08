import "./App.css";
// import Home from "./components/Home/home";
// import Page from "./portfolios/page";
import SideNavbar from "./MainDashboard/SideNavbar";

function App() {
  // return <Home />;
  // data-bs-theme="dark"
  return (
    <div
      className="App"
      style={{ backgroundColor: "#212529", color: "white" }}
      data-bs-theme="dark"
    >
      <header className="App-header">
        {/* <Page /> */}
        <SideNavbar />
      </header>
    </div>
  );
}

export default App;
