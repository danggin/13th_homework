import { gql } from "@apollo/client"

export const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
      youtubeUrl
      likeCount
      images
      boardAddress {
        zipcode
        address
        addressDetail
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`



export const FETCH_BOARD = gql`
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
