import { Redirect } from "react-router-dom";
import useAuth from "./useAuth";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("ProtectedRoute");

  const { user } = useAuth();

  const isAuthenticated = user !== null;

  return isAuthenticated ? children : <Redirect to="/login" />;
}
