import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <>
          <div>
            <button onClick={signOut}>Sign Out</button>
            <p>{user?.username}</p>
          </div>
          <div>
            App
          </div>
        </>
      )}
    </Authenticator>
  );
}

export default App;
