import styled from "styled-components";
import backgroundImg from "../../assets/loginImg.png";

const Wrapper = styled.div`

    margin: 0 auto;
    padding: 0;
    line-height: 1;
    list-style: none;
    width: 1200px;
    #backgroudImg{
        background-image: url(${backgroundImg});
        background-repeat: no-repeat;
        background-size: 100%;
        background-position: center;
    }

`
export default Wrapper; 