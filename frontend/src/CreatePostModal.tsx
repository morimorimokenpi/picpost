import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Modal,
  TextField,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useCreatePostMutation } from "./types.d";
// import { format, parse } from "date-fns";

const rand = () => {
  return Math.round(Math.random() * 20) - 10;
};

const getModalStyle = () => {
  const top = 50 + rand();
  const left = 50 + rand();
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

const CreatePostModal: React.FC = () => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState(3);

  const [createPost, { error, data }] = useCreatePostMutation({
    variables: {
      input: {
        title,
        content,
        userId,
      },
    },
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleButtonClick = () => {
    createPost();
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <TextField
        variant="outlined"
        label="title"
        onChange={(e) => setTitle(e.target.value)}
      >
        Title
      </TextField>
      <TextField
        label="Content"
        multiline
        rows={4}
        variant="outlined"
        onChange={(e) => setContent(e.target.value)}
      >
        Content
      </TextField>
      <Button variant="contained" color="primary" onClick={handleButtonClick}>
        投稿
      </Button>
    </div>
  );

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              News
            </Typography>
            <Button color="inherit" onClick={handleOpen}>
              新規投稿
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
};

export default CreatePostModal;
