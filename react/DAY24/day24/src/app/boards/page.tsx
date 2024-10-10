'use client';

import Image from "next/image"
import gql from "graphql-tag"
import { useState, MouseEvent } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { useRouter } from "next/navigation"
import { iFetchBoards } from "@/commons/types/types"
import styles from "./styles.module.css"
import iconDelete from '@/assets/icon_delete.svg'

const FETCH_BOARDS = gql`
query {
    fetchBoards {
        createdAt
        _id
        writer
        title
        contents
    }
}`

const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

export default function BoardsListPage() {
    const router = useRouter();
    const [hoverIndex, setHoverIndex] = useState("");
    const { data } = useQuery(FETCH_BOARDS);
    const [deleteBoard] = useMutation(DELETE_BOARD)

    const handleClickDetail = (
        event: MouseEvent<HTMLButtonElement>,
        id: String) => {
            event.stopPropagation();

        router.push(`./boards/${id}`);
    }

    const handleClickDelete = async (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();

        try {
          const response = await deleteBoard({
            variables: { boardId: hoverIndex },
            refetchQueries: [{ query: FETCH_BOARDS }],
          });
          alert("게시글을 삭제했습니다.");
        } catch (err) {
          console.error("삭제에 실패했습니다:", err);
        }
      };

  return (
    <>
        <div className={styles["app-list"]}>
            <div className={`flex gap-2 ${styles["list-header"]}`}>
                <h4 className={`${styles["item"]} ${styles["small"]}`}>번호</h4>
                <h4 className={`${styles["item"]} ${styles["large"]}`}>제목</h4>
                <h4 className={`${styles["item"]} ${styles["medium"]}`}>작성자</h4>
                <h4 className={`${styles["item"]} ${styles["medium"]} text-center`}>날짜</h4>
                <h4 className={`${styles["item"]} ${styles["small"]} invisible`}>삭제</h4>
            </div>
            <div className={styles["list-items"]}>
                {data?.fetchBoards.map((el:iFetchBoards, index: number) => (
                    <button type="button"
                    key={el._id}
                    className={`flex gap-2 ${styles["list-item"]}`}
                    onMouseEnter={() => setHoverIndex(el._id)}
                    onMouseLeave={() => setHoverIndex("")}
                    onClick={event => handleClickDetail(event, el?._id)}>
                        <span className={`${styles["item"]} ${styles["small"]} ${styles["gray"]}`}>{index + 1}</span>
                        <span className={`${styles["item"]} ${styles["large"]}`}>{el.title}</span>
                        <span className={`${styles["item"]} ${styles["medium"]}`}>{el.writer}</span>
                        <span className={`${styles["item"]} ${styles["medium"]} ${styles["gray"]}`}>{el.createdAt.substring(0, 10).replaceAll('-', '.')}</span>
                        <span 
                        className={`${hoverIndex === el._id ? "visible" : "invisible"} ${styles["item"]} ${styles["small"]} pl-6`}
                        onClick={handleClickDelete}>
                            <Image src={iconDelete} height={0} width={0} sizes="100vw" alt="삭제 버튼 아이콘" />
                        </span>
                    </button>
                ))}
            </div>
        </div>
    </>
    
  )
}
