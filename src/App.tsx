import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./Features/ui/AppLayout";
import HomePage from "./Features/Pages/HomePage";

import AnalyticsPage from "./Features/Pages/AnalyticsPage";
import ProfilePage from "./Features/Pages/ProfilePage";

import LinkPage from "./Features/Pages/LinkPage";
import RedirectPage from "./Features/Pages/RedirectPage";
import PageNotFound from "./Features/Pages/PageNotFound";
import LoginPage from "./Features/Pages/LoginPage";
import SignupPage from "./Features/Pages/SignupPage";
import ProtectedRoute from "./Features/ui/ProtectedRoute";
import HeroPage from "./Features/Pages/HeroPage";
import SettingsPage from "./Features/Pages/SettingsPage";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <BrowserRouter>
        <Routes>
          <Route path="/hero" element={<HeroPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<HomePage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/link" element={<LinkPage />} />
            <Route path="/scissor/:shortUrl" element={<RedirectPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 4000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-700)",
            color: "var(--color-grey-0)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
