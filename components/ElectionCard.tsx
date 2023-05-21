import Image from "next/image";

export interface Election {
  _id: string;
  name: string;
  date: string;
  image: string | "";
  status?: string;
}
export interface ElectionCardProps {
  election: Election;
  onClick: () => void;
}

const ElectionCard: React.FC<ElectionCardProps> = ({ election, onClick }) => {
  return (
    <div className="w-full bg-white hover:border hover:border-light-purple border border-transparent rounded-lg shadow-lg overflow-hidden max-h-[200px] flex flex-col justify-center items-stretch ">
      <div className="px-4 py-2 flex flex-col justify-between items-stretch h-[90%]">
        <h3 className="text-4xl font-semibold text-purple">{election?.name}</h3>
        <button
          className="text-purple border border-purple rounded-md px-3 py-1 mt-2"
          onClick={onClick}
        >
          See Details
        </button>
      </div>
    </div>
  );
};

export default ElectionCard;
