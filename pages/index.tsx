import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { AuthState, authState } from "../atoms";
import Input from "../components/Input";
import Button from "../components/Button";
import { Router, useRouter } from "next/router";
import { Toaster, toast } from "react-hot-toast";
import Spinner from "../components/Spinner";
import { Login } from "../libs/API";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setAuthState = useSetRecoilState(authState);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleLogin = async (event: any) => {
    event.preventDefault();
    if (email === "" || password === "") {
      toast("Please Enter Credentials");
      return;
    }
    try {
      setLoading(true);
      const user = await Login(email, password);

      if (user?.user) {
        setAuthState({ ...user?.user, token: user.token, isLoggedIn: true });
        toast.success("Login Successful");
        router.push("dashboard");
        setLoading(false);
      } else {
        setLoading(false);
        throw new Error();
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.message || "Invalid Credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-grey">
      <form
        onSubmit={handleLogin}
        className="p-10 bg-white rounded-lg shadow-lg border-l-2 border-purple"
      >
        <h1 className="text-5xl font-bold mb-10 text-center">
          Hello <span className="font-bold text-purple">Voter</span>
        </h1>
        <div className="mb-8">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="mb-4">
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <Button onClick={handleLogin}>{loading ? <Spinner /> : "Login"}</Button>
      </form>
    </div>
  );
};

export default LoginPage;
