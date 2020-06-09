import React, { Component } from "react";
import styled from "styled-components";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

class Time extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regTime: null,
    };
  }
  componentWillMount() {
    this.setState({ regTime: this.props.regTime });
  }
  render() {
    Date.prototype.format = function(f) {
      if (!this.valueOf()) return " ";

      var weekName = [
        "일요일",
        "월요일",
        "화요일",
        "수요일",
        "목요일",
        "금요일",
        "토요일",
      ];
      var d = this;

      return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
          case "yyyy":
            return d.getFullYear();
          case "yy":
            return (d.getFullYear() % 1000).zf(2);
          case "MM":
            return (d.getMonth() + 1).zf(2);
          case "dd":
            return d.getDate().zf(2);
          case "E":
            return weekName[d.getDay()];
          case "HH":
            return d.getHours().zf(2);
          case "hh":
            let h = d.getHours() % 12;
            return (h ? h : 12).zf(2);
          case "mm":
            return d.getMinutes().zf(2);
          case "ss":
            return d.getSeconds().zf(2);
          case "a/p":
            return d.getHours() < 12 ? "오전" : "오후";
          default:
            return $1;
        }
      });
    };

    String.prototype.string = function(len) {
      var s = "",
        i = 0;
      while (i++ < len) {
        s += this;
      }
      return s;
    };
    String.prototype.zf = function(len) {
      return "0".string(len - this.length) + this;
    };
    Number.prototype.zf = function(len) {
      return this.toString().zf(len);
    };
    let curTime = new Date()
    let passedTime = this.state.regTime - curTime
    return (
      <StTime>
        <AccessTimeIcon />
        <TimePassed>{curTime.format('hh:mm')}</TimePassed>
      </StTime>
    );
  }
}
export default Time;

const StTime = styled.div`
  font-size: 16px;
  justify-content: center;
  display: flex;
  align-items: center;
`;

const TimePassed = styled.div``;
