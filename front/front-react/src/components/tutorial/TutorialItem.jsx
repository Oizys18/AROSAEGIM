import React, { Component } from "react";
import styled from "styled-components";
import img1 from "../../assets/tutorial/tutorial.png";
import img2 from "../../assets/tutorial/tutorial2.png";
import img3 from "../../assets/tutorial/tutorial3.png";
import img4 from "../../assets/tutorial/tutorial4.png";

class TutorialItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: [
        {
          img: img1,
          text: 'W3W로 현재 위치가 표시됩니다. \n주소를 클릭하고 지도에서 정확한 위치를 탐색할 수 있습니다.',
          ex: 'W3W란?\n좌표를 세 개의 사전 단어로 고정해서 표시하는 위치 시스템',
          accent: 'top: 14%; left: 50%; transform: translateX(-50%); width: 130px; height: 55px;'
        },
        {
          img: img2,
          text: '텍스트를 입력하고 \n태그를 추가해 보세요. \n공개여부를 설정해서 나만의 비밀글을 남길 수 있습니다.'
        },
        { img: img3,
          text: '사진은 최대 5장 까지 첨부할 수 있습니다. \n지금 이 순간의 사진을 남기세요.'
        },
        { img: img4,
          text: '작성된 글은 홈과 마이페이지에서 확인할 수 있습니다. \n일 년 뒤 오늘, 다시 이 장소에서 새김을 확인해 보는건 어떠세요?'
        },
      ]
    };
  }
  render() {
    const PageChecker = () => {
      const curPage = this.state.contents[this.props.page]
      let newText = curPage.text.split('\n').map((text) => {
        return <p>{text}</p>
      })
      let newExtra = ""
      if (curPage.ex) {
        newExtra = curPage.ex.split('\n').map((text) => {
          return <p>{text}</p>
        })
      }
      if (this.props.page === 0) {
        return (<div>
            <StImg src={curPage.img} alt={curPage.text}/>
            <StAccent1/>
            <StDescription1>
              {newText}
            </StDescription1>
            <StExtra>
              {curPage.ex && newExtra}
            </StExtra>
          </div>)
      } else if (this.props.page === 1) {
        return (<div>
            <StImg src={curPage.img} alt={curPage.text}/>
            <StAccent2/>
            <StDescription2>
              {newText}
            </StDescription2>
            <StExtra>
              {curPage.ex && newExtra}
            </StExtra>
          </div>)
      } else if (this.props.page === 2) {
        return (<div>
            <StImg src={curPage.img} alt={curPage.text}/>
            <StAccent3/>
            <StDescription3>
              {newText}
            </StDescription3>
            <StExtra>
              {curPage.ex && newExtra}
            </StExtra>
          </div>)
      } else if (this.props.page === 3) {
        return (<div>
            <StImg src={curPage.img} alt={curPage.text}/>
            <StAccent4/>
            <StDescription4>
              {newText}
            </StDescription4>
            <StExtra>
              {curPage.ex && newExtra}
            </StExtra>
          </div>)
      }
    };

    return (
      <Wrapper>
        <PageChecker />
      </Wrapper>
    );
  }
}
export default TutorialItem;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  display: flex;
  color: white;
`;

const StImg = styled.img`
  position: absolute;
  top: 13%;
  left: 50%;
  transform: translateX(-50%);
`;

const StAccent = styled.div`
  mix-blend-mode: hard-light;
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.6);
  position: absolute;
  z-index: 3;
  border: 2px dashed white;
  border-radius: 15px;
  max-width: 400px;
`;

const StAccent1 = styled(StAccent)`
  mix-blend-mode: hard-light;
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.6);
  position: absolute;
  z-index: 3;
  border: 2px dashed white;
  border-radius: 15px;
  
  top: 14%; left: 50%; transform: translateX(-50%); width: 130px; height: 55px;
`;

const StAccent2 = styled(StAccent)`
  top: -5px; left: -5px;
`;

const StAccent3 = styled(StAccent)`
  left: 50%; transform: translateX(-50%); width: 75%; height: 150px;
  
  top: 50%;
  @media (max-height: 850px) {
    top: 55%;
  }
  @media (max-height: 750px) {
    top: 60%;
  }
  @media (max-height: 700px) {
    top: 65%;
  }
  @media (max-height: 600px) {
    top: 75%;
  }
`;

const StAccent4 = styled(StAccent)`
  top: -5px; left: -5px;
`;

const StDescription = styled.div`
  color: white;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 60vw;
  z-index: 3;
  word-break: keep-all;
`;

const StDescription1 = styled(StDescription)`
  bottom: 25%;
`;

const StDescription2 = styled(StDescription)`
  top: 30%;
`;

const StDescription3 = styled(StDescription)`
  top: 30%;
`;

const StDescription4 = styled(StDescription)`
  top: 40%;
 `;

const StExtra = styled(StDescription)`
  bottom: 10%;
  font-size: 0.9rem;
`;