import httpdo from '../util/httpdo'

function combineURLs(baseURL: string, relativeURL: string) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
}

class HTTPClient {
  address: string
  alertCallback: Function | undefined

  constructor(address: string, alertCallback?: Function) {
    this.address = address
    this.alertCallback = alertCallback
  }

  newClient(path: string) {
    return new HTTPClient(combineURLs(this.address, path), this.alertCallback)
  }

  async fetch(method: string, url: string, data?: any) {
    return await this.fetchNoAlert(method, url, data)
  }

  protected async fetchNoAlert(method: string, queryUrl: string, data?: any, depth?: number): Promise<any> {
    const targetUrl = combineURLs(this.address, queryUrl)

    try {
      return await httpdo(targetUrl, method, data)
    } catch (e) {
      if (depth && depth >= 10) {
        return Promise.reject(e)
      }
      this.alertCallback && this.alertCallback()
      return await this.fetchNoAlert(method, queryUrl, data, (depth || 0) + 1)
    }
  }
}

export default HTTPClient
