import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import useStyles from "./styles";

interface Props {
  onClick: Function;
}

const Header: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const handleButtonClick = () => {
    props.onClick();
  };

  return (
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
            Picpost
          </Typography>
          <Button color="inherit" onClick={handleButtonClick}>
            新規投稿
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
