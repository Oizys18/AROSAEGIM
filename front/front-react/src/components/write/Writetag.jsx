import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import Typography from "@material-ui/core/Typography";
import SmallButton from "../common/buttons/SmallButton"
const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function SimplePopover(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [tagText, changeTag] = React.useState(null);

  const handleTag = (e) =>{
    console.log(e.target.value)
    // setState({tagText:e.target.value})
    // console.log(this.state.tagText)
  }
  const createTag = () => {
    props.createTag(this.state.tagText)
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <LocalOfferIcon aria-describedby={id} onClick={handleClick} />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography className={classes.typography}>
          <input type="text" placeholder="태그작성" onChange={()=>changeTag()}/>
          <SmallButton text="작성" onClick={handleTag}/>
        </Typography>
      </Popover>
    </>
  );
}
