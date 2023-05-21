import { Fragment, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: any;
};

const Modal: React.FC<Props> = ({ isOpen, onClose, children }: any) => {
  const [isOverlayClicked, setIsOverlayClicked] = useState(false);

  const handleClose = () => {
    if (!isOverlayClicked) {
      onClose();
    }
  };

  return (
    <Fragment>
      {isOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="bg-white shadow-md rounded-lg w-full max-w-md mx-auto"
            onClick={() => setIsOverlayClicked(true)}
          >
            {children}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Modal;
