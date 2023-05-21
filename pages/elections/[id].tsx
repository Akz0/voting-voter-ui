import React, { useEffect, useState } from "react";
import { GetElectionCandidates } from "../../libs/API";
import { useRecoilValue } from "recoil";
import { authState } from "../../atoms";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import Navbar from "../../components/Navbar";
import Wallet from "../../components/Wallet";
import Candidates from "../../components/Candidates";
import Spinner from "../../components/Spinner";

const ElectionPage = () => {
  const router = useRouter();
  const auth = useRecoilValue(authState);
  const [loading, setLoading] = useState(false);
  const [candidates, setCandidates] = useState<any>([]);
  const getData = async () => {
    const token = auth?.token;
    try {
      const { id } = router.query;
      setLoading(true);
      const data = await GetElectionCandidates(token, id, auth?.locationId);
      setCandidates(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Failed to Fetch Election Data.");
    }
  };

  useEffect(() => {
    if (!auth?.isLoggedIn) {
      router.push("/");
    }
    getData();
  }, []);
  return (
    <div className="h-[80vh]">
      {loading ? (
        <Spinner />
      ) : (
        <div className="p-10 h-full">
          <Navbar />
          <div className=" h-[100%] flex w-full justify-between gap-2">
            <Candidates candidates={candidates} />
            <Wallet />
          </div>
        </div>
      )}
    </div>
  );
};

export default ElectionPage;
