import { useEffect, useState } from "react";
import { CandidateWalletsState } from "../atoms";
import { useRecoilState } from "recoil";
import { GetCandidateWallets } from "../libs/API";
import { toast } from "react-hot-toast";
import { MdGraphicEq } from "react-icons/md";
import { IoRibbonOutline } from "react-icons/io5";
import { FiRefreshCw } from "react-icons/fi";
import Spinner from "../components/Spinner";

const CandidateWallets = () => {
  const [loading, setLoading] = useState(false);
  const [wallets, setWallets] = useRecoilState(CandidateWalletsState);
  const getWallet = async () => {
    try {
      // setLoading(true);
      const data = await GetCandidateWallets();
      const W = data?.wallets;
      if (W) {
        setWallets({ candidates: W });
        // setLoading(false);
        console.log(W);
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error("Failed to fetch Wallet.");
      // setLoading(false);
    }
  };

  useEffect(() => {
    let intervalID = setInterval(getWallet, 2000);
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  const renderWallets = () => {
    return wallets?.candidates?.map((wallet, i) => {
      return (
        <div key={i} className="h-[70vh]">
          <div
            className="bg-white rounded-lg flex flex-col justify-between items-stretch
       border-2 w-full border-black shadow-lg p-4 py-8 h-[100%] max-w-[340px]"
          >
            <div className="bg-[#FDCB6E] text-center font-bold text-lg py-2 rounded-full flex items-center justify-evenly">
              <IoRibbonOutline
                color="purple"
                className="p-1 text-3xl hover:bg-slate-50 hover:border rounded-full cursor-pointer"
              />
              {wallet?.name}
              <FiRefreshCw
                color="purple"
                className="p-1 text-3xl hover:bg-slate-50 hover:border rounded-full cursor-pointer"
                onClick={() => getWallet()}
              />
            </div>
            <div className="w=[100%] flex flex-col items-center justify-center  text-center">
              <div className="w-[90%]">Your Address</div>

              <div className="w-[90%] h-auto flex text-center text-xl text-gray-500 justify-center items-center ">
                <span className="w-[80%] overflow-hidden">
                  {`...${wallet?.public_key.slice(
                    wallet?.public_key?.length - 20,
                    wallet?.public_key?.length - 1
                  )}`}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center h-24">
              {loading ? (
                <Spinner />
              ) : (
                <div className="text-center">
                  <span className="text-purple text-8xl font-bold">
                    {wallet?.tokens}
                  </span>
                  <div className=" text-xl font-light">Tokens Avaiable</div>
                </div>
              )}
            </div>

            {wallet?.tokens == 0 ? (
              <div className="w-full flex justify-center items-center">
                <div className="p-5 bg-red-200 rounded-full">
                  <div className="p-5 bg-red-300 rounded-full">
                    <div className="p-5 text-5xl  rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-200 via-red-400 to-red-500">
                      <MdGraphicEq />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full flex justify-center items-center">
                <div className="p-5 bg-green-200 rounded-full">
                  <div className="p-5 bg-green-300 rounded-full">
                    <div className="p-5 text-5xl  rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-200 via-green-400 to-green-500">
                      <MdGraphicEq />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    });
  };
  return (
    <div className="flex items-center border-2 justify-evenly h-screen bg-grey ">
      {renderWallets()}
    </div>
  );
};

export default CandidateWallets;
