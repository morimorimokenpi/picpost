import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
} from "@material-ui/core";
import { useCreatePostMutation } from "./types.d";
import Header from "./components/Header/Header";
// import { format, parse } from "date-fns";

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
    setOpen(false);
    createPost();
  };

  const body = (
    <>
      <DialogContent>
        <Grid>
          <TextField
            variant="outlined"
            label="タイトル"
            onChange={(e) => setTitle(e.target.value)}
          >
            Title
          </TextField>
        </Grid>
        <Grid>
          <TextField
            label="コンテント"
            multiline
            rows={4}
            variant="outlined"
            onChange={(e) => setContent(e.target.value)}
          >
            Content
          </TextField>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          戻る
        </Button>
        <Button onClick={handleButtonClick} color="primary">
          作成
        </Button>
      </DialogActions>
    </>
  );

  return (
    <>
      <Header onClick={handleOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Dialog>
    </>
  );
};

export default CreatePostModal;
