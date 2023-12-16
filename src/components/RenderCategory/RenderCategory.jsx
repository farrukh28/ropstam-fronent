import { IconButton, Menu, MenuItem, TableCell, TableRow } from "@mui/material";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useDisclosure } from "../../utils/hooks";
import { toast } from "sonner";
import axios from "axios";
import { MoreVert } from "@mui/icons-material";
import EditCategory from "../EditCategory/EditCategory";

const RenderCategory = ({ categoryID, title, createdAt, refetch }) => {
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
    const toastID = toast.loading("Deleting category...");
    try {
      await axios.delete(`/categories/${categoryID}`);
      toast.success("Category deleted", { id: toastID });
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
        <TableCell>{title}</TableCell>
        <TableCell>{dayjs(createdAt).format("YYYY-MM-DD hh:mm A")}</TableCell>
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
        <EditCategory
          open={isOpen}
          toggle={onToggle}
          categoryID={categoryID}
          title={title}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default RenderCategory;
