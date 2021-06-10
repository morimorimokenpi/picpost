import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  Container,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import CreatePostModal from "./CreatePostModal";
// import { format, parse } from "date-fns";
import { useUsersQuery } from "./types.d";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

const Post: React.FC = () => {
  const classes = useStyles();
  const { loading, error, data } = useUsersQuery();

  if (loading) return <div>"ロード中...";</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <>
      <CreatePostModal />
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
    </>
  );
};

export default Post;
