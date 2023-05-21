import { useRouter } from "next/router";
import CandidateCard, { Candidate } from "./CandidateCard";
import { useState } from "react";
import Modal from "./Modal";
import Button, { OutlinedButton } from "./Button";
import { CastVote } from "../libs/API";
import { useRecoilValue } from "recoil";
import { WalletState, authState } from "../atoms";
import { toast } from "react-hot-toast";

interface Props {
  candidates: Candidate[];
}

const Candidates: React.FC<Props> = ({ candidates }) => {
  const [currentCandidate, setCurrentCandidate] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const HandleVoteConfirm = (candidate: Candidate) => {
    setCurrentCandidate(candidate);
    handleOpenModal();
  };
  const router = useRouter();
  const auth = useRecoilValue(authState);
  const wallet = useRecoilValue(WalletState);
  const ConfirmVote = async () => {
    try {
      setLoading(true);
      const { id } = router.query;
      const data = await CastVote(auth.token, id, currentCandidate?._id);
      setLoading(false);

      toast.success("Vote Casted Successfully.");
      setCurrentCandidate({});
      setTransactionKey(data?.TransactionKey);
      setSignature(data?.SignatureGenerated);
      setKeyModalOpen(true);
      handleCloseModal();
    } catch (error) {
      toast.error("Voting Failed. Please try again.");
      setLoading(false);
    }
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [TransactionKey, setTransactionKey] = useState("");
  const [signature, setSignature] = useState("");
  const [KeyModalOpen, setKeyModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleRejectOpenModal = () => {
    setRejectModal(true);
  };
  const handleRejectCloseModal = () => {
    setRejectModal(false);
  };

  const handleKeyCloseModal = () => {
    setKeyModalOpen(false);
  };

  return (
    <div className="w-full h-[100%] border border-gray-200 rounded-lg flex flex-col gap-2 p-6">
      <div className="px-4 text-2xl font-light mb-10">All Candidates</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-[100%] h-[100%]">
        {candidates?.map((candidate) => (
          <CandidateCard
            key={candidate?.id}
            candidate={candidate}
            onClick={() => {
              if (wallet?.tokens > 0) {
                HandleVoteConfirm(candidate);
              } else {
                handleRejectOpenModal();
              }
            }}
          />
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={handleCloseModal}>
        <div className="p-10 flex flex-col justify-between items-center gap-4">
          <h1 className="text-2xl font-light">Vote Confirmation</h1>
          <p className="text-4xl font-bold font-lato">
            {currentCandidate?.name}
          </p>
          <div className="flex justify-center items-center gap-2">
            <OutlinedButton onClick={handleCloseModal}>
              Close Modal
            </OutlinedButton>
            <Button onClick={ConfirmVote}>Confirm Vote</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={rejectModal} onClose={handleRejectCloseModal}>
        <div className="p-10 flex flex-col justify-between items-center gap-4">
          <h1 className="text-2xl font-light">Cannot Vote</h1>
          <p className="text-4xl font-bold font-lato">
            You cannot Vote Anymore! You Have no Vote Tokens Left!
          </p>
          <div className="flex justify-center items-center gap-2">
            <OutlinedButton onClick={handleRejectCloseModal}>
              Close Modal
            </OutlinedButton>
          </div>
        </div>
      </Modal>

      <Modal isOpen={KeyModalOpen} onClose={handleKeyCloseModal}>
        <div className="p-10 flex flex-col justify-between items-center gap-4">
          <h1 className="text-2xl text-center font-light">
            Note the Following Key to Validate Vote
          </h1>
          <p className="text-4xl font-bold font-lato">{TransactionKey}</p>

          <div className="flex flex-col justify-center items-center gap-2 ">
            <p className="text-lg font-light font-lato">Signature Generated</p>
            <div className="bg-purple text-white w-[70%] rounded-lg px-4 py-2 shadow-sm hover:shadow-lg h-fit flex flex-wrap break-all">
              {signature}
            </div>
          </div>
          <div className="flex justify-center items-center gap-2">
            <OutlinedButton onClick={handleKeyCloseModal}>
              Close Modal
            </OutlinedButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Candidates;
