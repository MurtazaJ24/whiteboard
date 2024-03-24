import { Loader2 } from "lucide-react";
import useAuth from "../hooks/useAuth";

type Props = {
  children: React.ReactNode;
};

const PrivateRoute = ({ children }: Props) => {
  const {isLoggedIn} = useAuth()

  if (!isLoggedIn) {
    return <Loader2 className="w-6 h-6 animate-spin" />;
  }

  return children;
};

export default PrivateRoute;
