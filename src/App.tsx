import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator, Button } from "@aws-amplify/ui-react";
import HomeBar from "./components/HomeBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import PurchaseList from "./pages/PurchaseList";
import Detail from "./pages/Detail";

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <>
          <div className="App">
            <header className="App-header">
              <h2>{user?.username}</h2>
              <Button onClick={signOut}>SignOut</Button>
            </header>
            <main className="Main">
              <BrowserRouter>
                <HomeBar />
                <div className="MainContent">
                  <Routes>
                    <Route index path="/" element={<Home />} />
                    <Route
                      path="/register"
                      element={<Register username={user?.username} />}
                    />
                    <Route path="/shop" element={<Shop />} />
                    <Route
                      path="/cart"
                      element={<Cart username={user?.username} />}
                    />
                    <Route path="/purchase" element={<PurchaseList />} />
                    <Route path="/detail" element={null}>
                      <Route path=":id" element={<Detail />} />
                    </Route>
                  </Routes>
                </div>
              </BrowserRouter>
            </main>
            <footer className="App-footer"></footer>
          </div>
        </>
      )}
    </Authenticator>
  );
}

export default App;
