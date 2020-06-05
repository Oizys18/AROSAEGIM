import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import SmallButton from "../common/buttons/SmallButton";
const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function SimplePopover(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [tagText, changeTag] = React.useState(null);
  const [error, changeError] = React.useState(null);

  const handleTag = (e) => {
    if (e.target.value) {
      changeTag(e.target.value);
      changeError(0);
    } else {
      changeError(1);
    }
  };
  const createTag = () => {
    if (tagText) {
      props.createTag(tagText);
      changeTag(null);
      setAnchorEl(null);
    } else {
      changeError(1);
    }
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const ErrorStyle = styled.div`
    font-size: 8px;
    color: red;
  `;
  const ErrorTxt = () => {
    if (error) {
      return <ErrorStyle>태그를 입력해주세요</ErrorStyle>;
    } else {
      return <ErrorStyle>　</ErrorStyle>;
    }
  };
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
          <input type="text" placeholder="태그작성" onChange={handleTag} />
          <SmallButton text="작성" onClick={createTag} />
          <ErrorTxt />
        </Typography>
      </Popover>
    </>
  );
}
