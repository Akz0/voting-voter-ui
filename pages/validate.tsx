import React, { useState } from "react";
import Button, { OutlinedButton } from "../components/Button";
import Input from "../components/Input";
import { toast } from "react-hot-toast";
import Spinner from "../components/Spinner";
import { VerifyVote } from "../libs/API";
import Modal from "../components/Modal";

const Validate = () => {
  const [TransactionKey, setTransactionKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setmodalOpen] = useState(false);
  const [valid, setValid] = useState(false);
  const openModal = () => {
    setmodalOpen(true);
  };
  const closeModal = () => {
    setmodalOpen(false);
    setTransactionKey("");
  };

  const ValidateVote = async (event: any) => {
    event.preventDefault();
    if (TransactionKey === "") {
      toast("Please Enter the Key");
      return;
    }
    try {
      setLoading(true);
      const data = await VerifyVote(TransactionKey);
      console.log(data);
      alert("Done");
      if (data) {
        setValid(data?.valid);
        if (data?.valid) {
          toast.success("Validation Successful");
        } else {
          toast.error("The Vote Does not Exist");
        }
        setmodalOpen(true);
        setLoading(false);
      } else {
        setLoading(false);
        throw new Error();
      }
    } catch (error: any) {
      setLoading(false);
      toast.error("Failed Validation");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-grey">
      <form
        onSubmit={ValidateVote}
        className="p-10 bg-white rounded-lg shadow-lg border-l-2 border-purple"
      >
        <h1 className="text-5xl font-bold mb-10 text-center">
          Validate <span className="font-bold text-purple">Vote</span>
        </h1>
        <div className="mb-8">
          <Input
            label="Email"
            type="text"
            placeholder="Enter your email"
            value={TransactionKey}
            onChange={(event) => setTransactionKey(event.target.value)}
          />
        </div>
        <Button onClick={ValidateVote}>
          {loading ? <Spinner /> : "Validate"}
        </Button>
      </form>

      <Modal isOpen={modalOpen} onClose={closeModal}>
        <div className="p-10 flex flex-col justify-between items-center gap-4">
          {valid ? (
            <h1 className="text-2xl font-light">Vote Validated!</h1>
          ) : (
            "Invalid Key"
          )}
          <div className="flex justify-center items-center gap-2">
            <OutlinedButton onClick={closeModal}>Close Modal</OutlinedButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Validate;
