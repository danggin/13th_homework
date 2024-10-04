'use client'

import { useState } from "react"
import Image from "next/image"
import styles from "./styles.module.css"
import iconDelete from '@/assets/icon_delete.svg'
import gql from "graphql-tag"
import { useQuery } from "@apollo/client"
import { iFetchBoards } from "@/commons/types/types"

const FETCH_BOARDS = gql`
query {
    fetchBoards {
        createdAt
        _id
        writer
        title
        contents
    }
}
`

export default function BoardsListPage() {
    const [hoverIndex, setHoverIndex] = useState("");
    const { data } = useQuery(FETCH_BOARDS);

  return (
    <>
        <div className={styles["app-list"]}>
            <div className={`flex gap-2 ${styles["list-header"]}`}>
                <h4 className={`${styles["item"]} ${styles["small"]}`}>번호</h4>
                <h4 className={`${styles["item"]} grow`}>제목</h4>
                <h4 className={`${styles["item"]} ${styles["small"]}`}>작성자</h4>
                <h4 className={`${styles["item"]} ${styles["medium"]}`}>날짜</h4>
                <h4 className={`${styles["item"]} ${styles["small"]} hidden`}>삭제</h4>
            </div>
            <div className={styles["list-items"]}>
                {data?.fetchBoards.map((el:iFetchBoards, index: number) => (
                    <button type="button"
                    key={el._id}
                    className={`flex gap-2 ${styles["list-item"]}`}
                    onMouseEnter={() => setHoverIndex(el._id)}
                    onMouseLeave={() => setHoverIndex("")}>
                        <span className={`${styles["item"]} ${styles["small"]}`}>{index + 1}</span>
                        <span className={`${styles["item"]} grow`}>{el.title}</span>
                        <span className={`${styles["item"]} ${styles["small"]}`}>{el.writer}</span>
                        <span className={`${styles["item"]} ${styles["medium"]}`}>{el.createdAt.substring(0, 10).replaceAll('-', '.')}</span>
                        <span className={`${hoverIndex === el._id ? "block" : "hidden"} item small`}>
                            <Image src={iconDelete} height={0} width={0} sizes="100vw" alt="삭제 버튼 아이콘" />
                        </span>
                    </button>
                ))}
                
            </div>
        </div>
    </>
    
  )
}
