import {
  CitiesdaoVoteResponse,
  CitiesdaoVoteStatus,
} from 'src/shared/types/api'

export interface IRequestInit extends RequestInit {
  shouldReturnDataProperty?: boolean
}

export const genericRequest = async (url: string, options?: IRequestInit) => {
  const response = await fetch(url, options)
  let json

  try {
    json = await response.clone().json()
  } catch {
    json = await response.text()
  }

  if (response.ok) {
    if (options?.shouldReturnDataProperty) {
      return json.data
    }
    return json
  }
}

const apiUrl = 'https://api.app.swarm.com/'

export const request = async (endpoint: string, options?: IRequestInit) =>
  genericRequest(`${apiUrl}${endpoint}`, options)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const get = async <T = any>(
  endpoint: string,
  options?: IRequestInit
): Promise<T> =>
  request(endpoint, {
    ...options,
    method: 'GET',
  })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const post = async <T = any>(
  endpoint: string,
  options?: IRequestInit
): Promise<T> =>
  request(endpoint, {
    ...options,
    method: 'POST',
  })

const citiesdaoVote = async (
  email: string,
  space: string,
  proposal: string,
  choice: number
): Promise<CitiesdaoVoteResponse> => {
  const body = JSON.stringify({
    email,
    space,
    proposal,
    choice,
  })

  const res = await post<CitiesdaoVoteResponse>(`citiesdao/vote`, {
    body,
  })

  if (res.status !== CitiesdaoVoteStatus.statusSuccess) {
    throw Error(res.status)
  } else {
    return res
  }
}

export default {
  genericRequest,
  get,
  citiesdaoVote,
}
