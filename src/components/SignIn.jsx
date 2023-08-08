import GoogleButton from "react-google-button";
import { useAppStore } from "@/lib/zustand/AppStore";
import { auth } from "@/lib/firebase/index";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import SyncLoader from "react-spinners/SyncLoader";

export default function SignIn() {
  const isDarkMode = useAppStore((state) => state.isDarkMode);
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <div className="flex min-h-screen items-center justify-center bg-neutral-200 dark:bg-neutral-800">
        {!loading ? (
          <GoogleButton
            type={isDarkMode ? "dark" : "light"} // can be light or dark
            onClick={() => {
              signInWithGoogle();
            }}
          />
        ) : (
          <SyncLoader color="#635FC7" />
        )}
      </div>
    </div>
  );
}
