import { useState } from "react";
import { useSelector } from "react-redux";

export const useReduxUser = () => useSelector((state) => state.authUser.user);
export const useUserToken = () => useSelector((state) => state.authUser.token);

export const useDisclosure = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);
  const onToggle = () => setIsOpen(!isOpen);

  return {
    isOpen,
    onClose,
    onOpen,
    onToggle,
  };
};
