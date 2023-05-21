const baseURL = "http://localhost:3300/api/voter";
const candidateWalletsURL = "http://localhost:3300/api/candidate-wallets";
const validateVoteURL = "http://localhost:3300/api/validate-vote";
export const Login = async (email: string, password: string) => {
  const user = await fetch(`${baseURL}/login`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return user.json();
};

export const GetElectionCandidates = async (
  token: string,
  electionId: string | any,
  locationId: string
) => {
  const data = await fetch(`${baseURL}/get-election-candidates`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ electionId, locationId }),
  });

  return data.json();
};

export const GetVoterByID = async (token: string) => {
  const data = await fetch(`${baseURL}/my-data`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return data.json();
};
export const GetVoterWallet = async (token: string) => {
  const data = await fetch(`${baseURL}/get-wallet`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return data.json();
};
export const GetCandidateWallets = async () => {
  const data = await fetch(`${candidateWalletsURL}`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data.json();
};
export const CastVote = async (
  token: string,
  electionId: string,
  candidateId: string
) => {
  const data = await fetch(`${baseURL}/cast-vote`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ electionId, candidateId }),
  });
  return data.json();
};

export const VerifyVote = async (TransactionKey: string) => {
  alert("Validate Function");
  const data = await fetch(`${validateVoteURL}`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ TransactionKey }),
  });
  return data.json();
};
