import { graphql } from './gql'

export const CommentIdsQuery = graphql(`
  query CommentIds($limit: Int, $skip: Int = 0, $filter: Comment_filter) {
    comments(where: $filter, first: $limit, skip: $skip) {
      id
      sectionId
    }
  }
`)
