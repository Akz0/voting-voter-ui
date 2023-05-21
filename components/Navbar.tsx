import Link from "next/link";
import { useRecoilState } from "recoil";
import { authState } from "../atoms";
import { OutlinedButton } from "./Button";
import { useRouter } from "next/router";

const Navbar = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const router = useRouter();

  const handleLogout = () => {
    setAuth({
      name: "",
      email: "",
      id: "",
      isLoggedIn: false,
      token: "",
      locationId: "",
    });
    router.push("/");
  };

  const name = auth?.name.split(" ");
  return (
    <nav className="flex justify-between items-center py-4 px-6">
      <div
        className="font-bold text-white cursor-pointer"
        onClick={() => router.push("/dashboard")}
      >
        <span className="text-5xl font-bold text-black">{name[0]}</span>{" "}
        <span className="text-5xl font-bold text-black">&nbsp;</span>
        <span className="text-5xl font-bold text-red-500">{name[1]}</span>
      </div>
      <div>
        <OutlinedButton onClick={handleLogout}>Logout</OutlinedButton>
      </div>
    </nav>
  );
};

export default Navbar;
