"use client"

import Image from "next/image"
import { useParams } from "next/navigation"
import { gql, useQuery } from "@apollo/client"
import styles from "./styles.module.css"

import writerImage from "@/assets/icon_user.svg"
import fileAttached from "@/assets/icon_file.svg"
import addressEntered from "@/assets/icon_location.svg"
import detailImage from "@/assets/image_detail.png"
import thumbnailYoutube from "@/assets/thumbnail_video.png"
import iconDislike from "@/assets/icon_dislike.svg"
import iconLike from "@/assets/icon_like.svg"
import iconToList from "@/assets/icon_list.svg"
import iconEdit from "@/assets/icon_edit.svg"


const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      user {
        _id
        name
        picture
      }
      createdAt
      updatedAt
      deletedAt
      title
      contents
      images
      youtubeUrl
      likeCount
      dislikeCount
    }
  }
`

const BoardsDetail = () => {
  const params = useParams();
  const id = params.boardId;
  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: id },
  });


  // const sentences = data?.fetchBoard.contents.split('/\r\n|[\r\n]/')
  const formattedDate = data?.fetchBoard.createdAt.substring(0, 10).replaceAll('-', '.');


  return (
    <>
      <div className={styles["app-detail"]}>
        <div className={`${styles["detail-header"]} border-b`}> 
          <h2>{data?.fetchBoard.title}</h2>
          <div className={`${styles["detail-header-info"]} flex`}>
            <div className={`${styles["info-writer"]} flex align-center`}>
              <div className={styles["writer-image"]}>
                <Image src={writerImage} alt="작성자 프로필 이미지" width={0} height={0} sizes="100vw"/>
              </div>
              <span className={styles["writer-name"]}>{data?.fetchBoard.writer}</span>
            </div>
            <div className={styles["info-date"]}>{formattedDate}</div>
          </div>
        </div>
        <section className={styles["detail-content"]}>
          <div className={`${styles["content-info"]} flex justify-end gap-2`}>
            <Image src={fileAttached} alt="파일 첨부됨"  width={0} height={0} sizes="100vw" />
            <Image src={addressEntered} alt="주소 입력됨"  width={0} height={0} sizes="100vw" />
          </div>
          <div className={styles.contents}>
            <div className={styles["contents-cover"]}>
            {data?.fetchBoard?.images[0] !== '' ? data?.fetchBoard?.images.map((el: string, index: number) => (<Image key={index} src={el} alt="게시물 이미지" className={styles["contents-cover-item"]} width={0} height={0} sizes="100vw" />)) : "" }
            </div>
            <p className={styles["contents-text"]}>{data?.fetchBoard.contents}</p>
            <div className={styles["contents-video"]}>
              {data?.fetchBoard.youtubeUrl && <video src={data.fetchBoard.youtubeUrl}></video>}
            </div>
            <div className={`${styles["contents-action"]} flex`}>
              <div className={`${styles["action-dislike"]} flex col`}>
                <button type="button">
                  <Image src={iconDislike} alt="싫어요 버튼"  width={0} height={0} sizes="100vw"/>
                </button>
                <span>{data?.fetchBoard.dislikeCount}</span>
              </div>
              <div className={`${styles["action-like"]} flex col`}>
                <button type="button">
                  <Image src={iconLike} alt="좋아요 버튼"  width={0} height={0} sizes="100vw"/>
                </button>
                <span className={styles["like-count"]}>{data?.fetchBoard.likeCount}</span>
              </div>
            </div>
          </div>
        </section>
        <div className={`${styles["detail-buttons"]} flex justify-center gap-6`}>
          <button type="button" className="button-common button-border-type button-icon-type button-back">
            <Image src={iconToList} alt="목록으로 가기 버튼 아이콘" width={0} height={0} sizes="100vw" />
            <span>목록으로</span>
          </button>
          <button type="button" className="button-common button-border-type button-icon-type button-edit">
            <Image src={iconEdit} alt="수정하기 버튼 아이콘"  width={0} height={0} sizes="100vw"/>
            <span>수정하기</span>
          </button>
        </div>
      </div>
      </>
  );
};

export default BoardsDetail;
