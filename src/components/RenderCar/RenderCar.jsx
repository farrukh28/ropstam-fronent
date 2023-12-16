import { IconButton, Menu, MenuItem, TableCell, TableRow } from "@mui/material";
import React, { useState } from "react";
import { useDisclosure } from "../../utils/hooks";
import { toast } from "sonner";
import axios from "axios";
import { MoreVert } from "@mui/icons-material";
import EditCar from "../EditCar/EditCar";

const RenderCar = ({
  carID,
  categoryID,
  make,
  model,
  color,
  registrationNumber,
  categoryTitle,
  refetch,
}) => {
  // state
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // hooks
  const { isOpen, onToggle } = useDisclosure();

  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = (e) => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onToggle();
    handleCloseMenu();
  };

  const handleDelete = async () => {
    setIsLoading(true);
    const toastID = toast.loading("Deleting car...");
    try {
      await axios.delete(`/cars/${carID}`);
      toast.success("Car deleted", { id: toastID });
      refetch();
      handleCloseMenu();
    } catch (error) {
      toast.error(error.message, { id: toastID });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <TableRow hover>
        <TableCell>{make}</TableCell>
        <TableCell>{model}</TableCell>
        <TableCell>{color}</TableCell>
        <TableCell>{registrationNumber}</TableCell>
        <TableCell align="center">{categoryTitle}</TableCell>
        <TableCell align="center">
          <IconButton onClick={handleOpenMenu}>
            <MoreVert />
          </IconButton>
        </TableCell>
      </TableRow>

      <Menu
        onClose={handleCloseMenu}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
      >
        <MenuItem onClick={handleEdit} disabled={isLoading}>
          Edit
        </MenuItem>
        <MenuItem
          disabled={isLoading}
          onClick={handleDelete}
          className="hover:text-red-500"
        >
          Delete
        </MenuItem>
      </Menu>

      {isOpen && (
        <EditCar
          open={isOpen}
          toggle={onToggle}
          categoryID={categoryID}
          make={make}
          carID={carID}
          color={color}
          model={model}
          registrationNumber={registrationNumber}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default RenderCar;
