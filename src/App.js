import { Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
//pages
import Homepage from "./pages/Homepage";
import Signup from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import PageNotFound from "./pages/PageNotFound";
//components
import RequireAuth from "./components/RequireAuth";
import Navigation from "./pages/partials/Navigation";

function App() {
  return (
    <div className="App">
      <Navigation />

      <Routes>
        {/* Guest Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <RequireAuth redirectTo="login">
              <Homepage />
            </RequireAuth>
          }
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </div>
  );
}

export default App;
