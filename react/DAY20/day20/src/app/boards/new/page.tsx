"use client"
import Image from "next/image";
import { ChangeEvent, useState } from "react";

import styles from "./styles.module.css"
import iconPlus from "@/assets/icon_plus.svg";

const BoardsNew = () => {
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isActive, setIsActive] = useState(false);

  const [errorWriter, setErrorWriter] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const [errorContent, setErrorContent] = useState("");

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setWriter(value);

    if (event.target.value && password && title && content) return setIsActive(true);
    setIsActive(false);
  };
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);

    if (writer && event.target.value && title && content) return setIsActive(true);
    setIsActive(false);
  };
  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTitle(value);

    if (writer && password && event.target.value && content) return setIsActive(true);
    setIsActive(false);
  };
  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setContent(value);

    if (writer && password && title && event.target.value) return setIsActive(true);
    setIsActive(false);
  };

  const onClickRegister = () => {

    const isValid = writer.trim() === "" || password.trim() === "" || title.trim() === "" || content.trim() === "";

    !writer ? setErrorWriter("필수입력 사항입니다.") : setErrorWriter("");
    !password ? setErrorPassword("필수입력 사항입니다.") : setErrorPassword("");
    !title ? setErrorTitle("필수입력 사항입니다.") : setErrorTitle("");
    !content ? setErrorContent("필수입력 사항입니다.") : setErrorContent("");

    if (!isValid) {
      alert("게시글 등록이 가능한 상태입니다.");
      setErrorWriter("");
      setErrorPassword("");
      setErrorTitle("");
      setErrorContent("");
    }
  };

  return (
    <>
      <div className={styles["app-register"]}>
        <form className={styles["register-form"]}>
          <legend className={styles["form-title"]}>게시물 등록</legend>
          <div className="flex gap-10">
            <div className={`${styles.required} flex flex-col gap-2 w-1/2`}>
              <label htmlFor="post-writer-input">작성자</label>
              <input type="text" id="post-writer-input" onChange={(event) => onChangeWriter(event)} placeholder="작성자 명을 입력해 주세요." />
              <p className="error-message">{errorWriter}</p>
            </div>

            <div className={`${styles.required} flex flex-col gap-2 w-1/2`}>
              <label htmlFor="post-password-input">비밀번호</label>
              <input type="password" id="post-password" onChange={(event) => onChangePassword(event)} placeholder="비밀번호를 입력해 주세요." />
              <p className="error-message">{errorPassword}</p>
            </div>
          </div>
          <div className={`${styles.required} border-b required flex flex-col gap-2`}>
            <label htmlFor="post-title">제목</label>
            <input type="text" id="post-title" onChange={(event) => onChangeTitle(event)} placeholder="제목을 입력해 주세요." />
            <p className="error-message">{errorTitle}</p>
          </div>
          <div className={`${styles.required} flex flex-col gap-2`}>
            <label htmlFor="post-content">내용</label>
            <textarea id="post-content" onChange={(event) => onChangeContent(event)} placeholder="내용을 입력해 주세요." />
            <p className="error-message">{errorContent}</p>
          </div>
          <div className="border-b flex flex-col gap-2">
            <label htmlFor="post-address">주소</label>
            <div className="flex gap-2">
              <input type="text" id="post-address" placeholder="01234" />
              <button type="button" className="button-common button-border-type">
                우편번호 검색
              </button>
            </div>
            <input type="text" placeholder="주소를 입력해 주세요." />
            <input type="text" placeholder="상세주소" />
          </div>
          <div className="border-b flex flex-col gap-2">
            <label htmlFor="post-youtube">유튜브 링크</label>
            <input type="text" id="post-youtube" placeholder="링크를 입력해 주세요." />
          </div>
          <div className="flex flex-col gap-8">
            <label>사진 첨부</label>
            <div className="flex gap-4">
              <button type="button" className={`${styles["button-upload"]} flex flex-col`}>
                <Image src={iconPlus} alt="" width={0} height={0} sizes="100vw" />
                <span>클릭해서 사진 업로드</span>
              </button>
              <button type="button" className={`${styles["button-upload"]} flex flex-col`}>
                <Image src={iconPlus} alt="" width={0} height={0} sizes="100vw" />
                <span>클릭해서 사진 업로드</span>
              </button>
              <button type="button" className={`${styles["button-upload"]} flex flex-col`}>
                <Image src={iconPlus} alt=""  width={0} height={0} sizes="100vw"/>
                <span>클릭해서 사진 업로드</span>
              </button>
            </div>
          </div>
          <div className={`${styles.actions} flex gap-4 justify-end`}>
            <button type="button" className="button-common button-border-type">
              취소
            </button>
            <button onClick={onClickRegister} className={`button-common button-fill-type ${isActive ? "bg-blue" : "bg-gray disabled"}`}>
              등록하기
            </button>
          </div>
        </form>
      </div>
      </>
  );
};

export default BoardsNew;
