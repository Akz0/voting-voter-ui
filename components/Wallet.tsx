import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { WalletState, authState } from "../atoms";
import { GetVoterWallet } from "../libs/API";
import { toast } from "react-hot-toast";
import Spinner from "./Spinner";
import { FiRefreshCw } from "react-icons/fi";
import { IoRibbonOutline } from "react-icons/io5";
import { MdGraphicEq } from "react-icons/md";

const Wallet: React.FC<{}> = ({}) => {
  const [loading, setLoading] = useState(false);
  const auth = useRecoilValue(authState);
  const [wallet, setWallet] = useRecoilState(WalletState);

  const getWallet = async () => {
    try {
      setLoading(true);
      const token = auth?.token;
      const data = await GetVoterWallet(token);
      const W = data?.wallet;
      if (W) {
        setWallet({ public_key: W?.public_key, tokens: W?.tokens });
        setLoading(false);
        console.log(data);
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error("Failed to fetch Wallet.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <div
      className="bg-white rounded-lg flex flex-col justify-between items-stretch
    border-2 w-full border-black shadow-lg p-4 py-8 h-[100%] max-w-[340px]"
    >
      <div className="bg-[#FDCB6E] text-center font-bold text-lg py-2 rounded-full flex items-center justify-evenly">
        <IoRibbonOutline
          color="purple"
          className="p-1 text-3xl hover:bg-slate-50 hover:border rounded-full cursor-pointer"
        />
        Your Wallet
        <FiRefreshCw
          color="purple"
          className="p-1 text-3xl hover:bg-slate-50 hover:border rounded-full cursor-pointer"
          onClick={() => getWallet()}
        />
      </div>
      <div className="w=[90%] flex flex-col items-center justify-center  text-center">
        <div className="w-[90%]">Your Address</div>

        <div className="w-[90%] h-auto flex overflow-hidden text-xl text-gray-500 ">
          <span className="w-[70%]">{wallet?.public_key.slice(0, 23)}...</span>{" "}
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

      {wallet?.tokens === 0 ? (
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
  );
};

export default Wallet;
