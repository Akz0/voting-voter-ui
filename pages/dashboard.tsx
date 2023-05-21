import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import { authState } from "../atoms";
import Navbar from "../components/Navbar";
import Wallet from "../components/Wallet";
import { GetVoterByID } from "../libs/API";
import { Election } from "../components/ElectionCard";
import { toast } from "react-hot-toast";
import Elections from "../components/Elections";
import Spinner from "../components/Spinner";

const Dashboard = () => {
  const auth = useRecoilValue(authState);
  const router = useRouter();
  const [elections, setElections] = useState<Election[]>([]);
  const [loading, setLoading] = useState(false);
  const getData = async (token: string) => {
    try {
      if (!auth.token) return;
      setLoading(true);
      const data = await GetVoterByID(auth.token);
      const E = data?.elections?.map((election: any) => {
        return { ...election.electionId, status: election.status };
      });
      console.log(elections);
      setElections(E);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Could Not Get Voter Data.");
    }
  };

  useEffect(() => {
    if (!auth?.isLoggedIn) {
      router.push("/");
    }
    getData(auth?.token);
  }, []);

  return (
    <div className="h-[80vh] ">
      {loading ? (
        <Spinner />
      ) : (
        <div className="p-10 h-full">
          <Navbar />
          <div className=" h-[100%] flex w-full justify-between gap-2">
            <Elections elections={elections} />
            <Wallet />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
