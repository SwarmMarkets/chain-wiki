import CommentIcon from '@src/assets/icons/comment.svg'

export const createCommentIconElement = () => {
  const commentIconElem = document.createElement('object')
  commentIconElem.setAttribute('type', 'image/svg+xml')
  commentIconElem.setAttribute('data', CommentIcon)

  commentIconElem.style.display = 'none'
  commentIconElem.style.position = 'absolute'
  commentIconElem.style.top = '0'
  commentIconElem.style.right = '0'

  return commentIconElem
}
