import React from "react";
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
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import MenuIcon from "@material-ui/icons/Menu";

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
      }
    }
  }
`;

const Post: React.FC = () => {
  const classes = useStyles();

  const { loading, error, data } = useQuery<UserProps>(GET_USERS);

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
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
      {data?.users.map((user) => (
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
                subheader="September 14, 2016"
              />
              <CardMedia
                className={classes.media}
                image="/static/images/cards/paella.jpg"
                title="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {post.content}
                </Typography>
              </CardContent>
            </>
          ))}
        </Card>
      ))}
    </>
  );
};

export default Post;
