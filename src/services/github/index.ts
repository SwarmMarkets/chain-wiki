import axios from 'axios'
import { environment } from 'src/environment'

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `Bearer ${environment.girhubToken}`,
  },
})

export const fetchRepoTree = async (
  username: string,
  repoName: string,
  branchName: string
) => {
  try {
    const response = await githubApi.get(
      `/repos/${username}/${repoName}/git/trees/${branchName}?recursive=1`
    )
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch repo tree')
  }
}

export const fetchFileContent = async (url: string): Promise<string> => {
  try {
    const response = await githubApi.get(url)
    return atob(response.data.content)
  } catch (error) {
    throw new Error(`Failed to fetch file content from ${url}`)
  }
}

export const fetchRepoFiles = async (
  tree: any
): Promise<Record<string, string>> => {
  const files: Record<string, string> = {}

  for (const file of tree.tree) {
    if (file.type === 'blob') {
      const content = await fetchFileContent(file.url)
      files[file.path] = content
    }
  }

  return files
}
