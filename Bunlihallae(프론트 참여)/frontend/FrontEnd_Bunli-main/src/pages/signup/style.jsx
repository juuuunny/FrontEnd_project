import styled from "styled-components";
import backgroundImg from "../../assets/loginImg.png"


export const SignupBody = styled.div`
  #container {
    height: 100vh;
    background-image: url(${backgroundImg});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: relative;
  }

  #form {
    // background-color: white;
    border-radius: 20px;
    box-sizing: border-box;
    width: 20%;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 60%;
    transform: translate(-50%, -50%);

    input{
      font-size: 90%;
      text-align: left;
      width: 80%;
      border: 2px solid #aaaaaa;
      box-sizing: border-box;
      border-radius: 5px;
      transition: all 0.5s;
      padding-top: 5px;
      padding-bottom: 5px;
      padding-left: 7px;
      margin-top: 10px;
      border: 2px solid #2E36A5;
    }
    input:nth-child(1){
      margin-top: 15px;
    }

    //로그인 창에서 로그인 버튼
    #loginBtn{
      display: block;
      color: white; //글자 색
      border: none;
      background-color: #2E36A5;
      margin: 0 auto;
      font-size: 100%;
      line-height: 2;
      border-radius: 10px;
      width: 80%;
      margin-top: 20px;
      transition: all 0.5s;
      margin-bottom: 15px;
    }
    p {
      color: white;
      font-size: 80%;
      margin-bottom: 10px;
    }

    //로그인 창에서 회원가입 버튼
    #signup{
      display: block;
      color: white;
      border: none;
      background-color: transparent;
      margin: 0 auto;
      font-size: 100%;
      line-height: 0;
      border-radius: 10px;
      width: 80%;
      margin-top: 20px;
      transition: all 0.5s;
      margin-bottom: 15px;
      font-size: 12px;
    }
    p {
      color: white;
    }

    //회원가입에서 완료 버튼
    #signupBtn{
      display: block;
      color: white;
      border: none;
      background-color: #2E36A5;
      margin: 0 auto;
      font-size: 100%;
      line-height: 2;
      border-radius: 10px;
      width: 80%;
      margin-top: 20px;
      transition: all 0.5s;
      margin-bottom: 15px;
    }
    p {
      color: white;
      font-size: 80%;
      margin-bottom: 10px;
    }
  }


`