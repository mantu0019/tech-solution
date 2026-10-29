 
import { useEffect, useState } from "react";
import useAuth from "../features/auth/hooks/useAuth";
import Loading from "./Loading";

const AuthInitializer = ({ children }) => {
  const { getMeByUser } = useAuth();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        await getMeByUser();
      } catch (error) {
       } finally {
        if (isMounted) {
          setCheckingAuth(false);
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [getMeByUser]);

  if (checkingAuth) {
    return <Loading />;
  }

  return children;
};

export default AuthInitializer;
 
