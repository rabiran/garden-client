import React from "react";
import { Toolbar, Typography, IconButton, Tooltip } from "@material-ui/core";
import { makeStyles, lighten } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteAllowedUserApi, getAllowedUsersApi } from "../../../api/api";
import { useSnackbar } from "notistack";
import clsx from "clsx";
const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

export default ({ numSelected, rowsSelected, setRowsSelected, data,setData }) => {
  const classes = useToolbarStyles();
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async (event) => {
    try {
      for (let item of rowsSelected) {
        await deleteAllowedUserApi(item.id);
      }

      const permissionedUsers= await getAllowedUsersApi();
      setData(permissionedUsers);
      setRowsSelected([]);
      enqueueSnackbar("מחיקה הוצלחה", {
        variant: "success",
        autoHideDuration: 2000,
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("תקלה במחיקת משתמש", {
        variant: "error",
        autoHideDuration: 2000,
      });
      setRowsSelected([]);
    }
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {console.log(numSelected)}
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          נבחר {numSelected}
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h4"
          id="tableTitle"
          component="div"
        >
          משתמשים מורשים
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <></>
      )}
    </Toolbar>
  );
};
