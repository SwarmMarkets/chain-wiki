import CommentIcon from '@src/assets/icons/comment.svg'

export const createCommentIconElement = () => {
  const commentIconElem = document.createElement('img')
  commentIconElem.setAttribute('type', 'image/svg+xml')
  commentIconElem.setAttribute('src', CommentIcon)

  commentIconElem.style.width = '22px'
  commentIconElem.style.height = '22px'
  commentIconElem.style.cursor = 'pointer'
  
  commentIconElem.style.background = 'white'
  commentIconElem.style.padding = '5px'
  commentIconElem.style.borderRadius = '5px'
  commentIconElem.style.border = 'solid 1px #ccc'
  commentIconElem.style.display = 'none'
  commentIconElem.style.position = 'absolute'
  commentIconElem.style.top = '0'
  commentIconElem.style.right = '0'

  return commentIconElem
}
