import { useRouter } from "next/router";
import ElectionCard, { Election } from "./ElectionCard";

interface Props {
  elections: Election[];
}

const Elections: React.FC<Props> = ({ elections }) => {
  const router = useRouter();

  const navigateToElectionDetails = (id: string) => {
    router.push(`/elections/${id}`);
  };

  return (
    <div className="w-full h-[100%] border border-gray-200 rounded-lg flex flex-col gap-2 p-6">
      <div className="px-4 text-2xl mb-10 font-light">
        Current On Going Elections which you are Eligible for.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-[100%] h-[100%]">
        {elections?.map((election) => {
          if (election?.status !== "incomplete") return;
          return (
            <ElectionCard
              key={election?._id}
              election={election}
              onClick={() => navigateToElectionDetails(election?._id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Elections;
