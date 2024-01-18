import { useState } from "react";

import Modal from "@/components/ui/modal";

export default function useModal() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState();

  const showModalHandler = (content) => {
    setModalContent(<Modal onClick={closeModalHandler}>{content}</Modal>);
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  return {
    showModalHandler,
    closeModalHandler,
    showModal,
    modalContent,
  };
}
