export interface IRequestInit extends RequestInit {
  shouldNotReturnDataProperty?: boolean
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
    if (options?.shouldNotReturnDataProperty) {
      return json
    }
    return json.data
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
): Promise<void> => {
  const body = JSON.stringify({
    email,
    space,
    proposal,
    choice,
  })
  return post(`citiesdao/vote`, {
    body,
  })
}

export default {
  genericRequest,
  get,
  citiesdaoVote,
  location,
}
