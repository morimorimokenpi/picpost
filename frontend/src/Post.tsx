import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  Container,
  Modal,
  TextField,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import MenuIcon from "@material-ui/icons/Menu";
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
    cardRoot: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
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

interface UserProps {
  loading: boolean;
  users: [User];
}

interface User {
  id: string;
  nickname: string;
  email: string;
  passwordDigest: string;
  posts: [Posts];
}

interface Posts {
  id: string;
  title: string;
  content: string;
  userId: number;
  createdAt: Date;
}

const GET_USERS = gql`
  {
    users {
      id
      nickname
      email
      passwordDigest
      posts {
        id
        title
        content
        userId
        createdAt
      }
    }
  }
`;

const Post: React.FC = () => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const { loading, error, data } = useQuery<UserProps>(GET_USERS);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <TextField label="title">Title</TextField>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
    </div>
  );

  if (loading) return <div>"ロード中...";</div>;
  if (error) return <div>{error.message}</div>;
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
      {data?.users.map((user) => (
        <Container maxWidth="sm">
          <Card className={classes.cardRoot} key={user.id}>
            {user.posts.map((post) => (
              <>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      {user.nickname}
                    </Avatar>
                  }
                  title={post.title}
                  subheader={post.createdAt}
                />
                <CardMedia
                  className={classes.media}
                  image="/static/images/cards/paella.jpg"
                  title="Paella dish"
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {post.content}
                  </Typography>
                </CardContent>
              </>
            ))}
          </Card>
        </Container>
      ))}
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

export default Post;
