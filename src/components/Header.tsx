import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  AiOutlineMenu,
  AiFillYoutube,
  AiOutlineVideoCameraAdd,
  AiOutlineBell,
  AiOutlineUser,
  AiOutlineSearch,
} from "react-icons/ai";
import { styled } from "styled-components";
import { searchVideos } from "../apis/data";
import { useNavigate } from "react-router-dom";
const Header = (): JSX.Element => {
  const [inputValue, setInputValue] = useState("");
  const navigation = useNavigate();

  const changeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const submitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigation(`/video/${inputValue}`);
  };

  return (
    <Container>
      <LeftBox>
        <AiOutlineMenu />
        <LogoBox onClick={() => navigation("/")}>
          <div>
            <AiFillYoutube />
          </div>
          <span>Youtube</span>
        </LogoBox>
      </LeftBox>
      <SearchBox onSubmit={submitHandle}>
        <input type="text" placeholder="search" value={inputValue} onChange={changeHandle} />
        <button>
          <AiOutlineSearch />
        </button>
      </SearchBox>
      <RightBox>
        <AiOutlineVideoCameraAdd />
        <AiOutlineBell />
        <AiOutlineUser />
      </RightBox>
    </Container>
  );
};

export default Header;

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
`;

const LeftBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  column-gap: 1rem;
  cursor: pointer;

  span {
    font-weight: bold;
  }
`;
const LogoBox = styled.div`
  display: flex;
  align-items: center;

  div {
    display: flex;
    font-size: 2.5rem;
    color: red;
  }
`;
const SearchBox = styled.form`
  width: 40%;
  height: 27px;
  border-radius: 5px;
  border: solid 1px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  opacity: 1;

  input {
    flex: 9;
    height: 25px;
    border: none;
    text-align: left;
    margin-left: 10px;
    font-size: 15px;
    outline: none;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    flex: 0.5;
    background: transparent;
    border: none;
    outline: none;
  }
`;
const RightBox = styled.div`
  display: flex;
  font-size: 1.5rem;
  column-gap: 0.5rem;
  cursor: pointer;
`;
