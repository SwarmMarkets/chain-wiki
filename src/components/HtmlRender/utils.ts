import { CommentIdsQuery } from 'src/queries'
import client from 'src/services/apollo'

const countsBySectionId = new Map<string, number>()

const getCountOfAttestations = async (sectionId: string): Promise<number> => {
  try {
    if (countsBySectionId.has(sectionId)) {
      return countsBySectionId.get(sectionId) || 0
    }

    const { data } = await client.query({
      query: CommentIdsQuery,
      variables: { filter: { sectionId }, limit: 50 },
      fetchPolicy: 'cache-first',
    })
    countsBySectionId.set(sectionId, data.comments.length)
    return data.comments.length
  } catch (error) {
    console.error('Error fetching comments count:', error)
    return 0
  }
}

export const createCommentIconElement = async (sectionId: string) => {
  const wrapperElem = document.createElement('div')
  wrapperElem.style.position = 'relative'
  wrapperElem.style.display = 'none'
  wrapperElem.style.top = '0'
  wrapperElem.style.right = '0'

  const commentIconElem = document.createElement('img')
  commentIconElem.setAttribute('type', 'image/svg+xml')
  commentIconElem.setAttribute('src', 'assets/comment.svg')
  commentIconElem.style.width = '22px'
  commentIconElem.style.height = '22px'
  commentIconElem.style.cursor = 'pointer'
  wrapperElem.style.position = 'absolute'
  wrapperElem.style.top = '0'
  wrapperElem.style.right = '0'
  commentIconElem.style.background = 'white'
  commentIconElem.style.padding = '5px'
  commentIconElem.style.borderRadius = '5px'
  commentIconElem.style.border = 'solid 1px #ccc'

  const commentCount = await getCountOfAttestations(sectionId)
  const commentCountElem = document.createElement('span')
  commentCountElem.textContent = commentCount.toString()
  commentCountElem.style.position = 'absolute'
  commentCountElem.style.top = '-10px' // Adjust position above the icon
  commentCountElem.style.left = '-10px'
  commentCountElem.style.backgroundColor = '#36c'
  commentCountElem.style.color = '#fff'
  commentCountElem.style.borderRadius = '50%'
  commentCountElem.style.padding = '2px 6px'
  commentCountElem.style.fontSize = '12px'

  wrapperElem.appendChild(commentIconElem)
  wrapperElem.appendChild(commentCountElem)
  return wrapperElem
}
