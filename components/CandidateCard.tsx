import Image from "next/image";

export interface Candidate {
  id: string;
  name: string;
  image: string | "";
  active: boolean;
}
export interface CandidateCardProps {
  candidate: Candidate;
  onClick: () => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  onClick,
}) => {
  return (
    <div className="w-full hover:border hover:border-light-purple border border-transparent bg-white rounded-lg shadow-lg overflow-hidden max-h-[200px] flex flex-col justify-center items-stretch ">
      <div className="px-4 py-2 flex flex-col justify-between items-stretch h-[90%]">
        <h3 className="text-4xl font-semibold text-purple">
          {candidate?.name}
        </h3>
        <button
          className="text-purple border border-purple rounded-md px-3 py-1 mt-2"
          onClick={onClick}
        >
          Vote
        </button>
      </div>
    </div>
  );
};

export default CandidateCard;
