import sleep from '../util/sleep'
import axios, { AxiosResponse } from 'axios'

async function httpdo(url: string, method: string = 'GET', payload?: any): Promise<any> {
  // const startTime = new Date().getTime()

  const options = {
    url,
    method,
    data: payload
  }

  // Do HTTP Request
  // console.log(`Shell: curl -X ${method} -d '${payload}' '${url}'`)
  let res: AxiosResponse
  try {
    res = await axios(options)

  } catch (e) {
    // console.log(`retry to connect, error: ${e}`)
    await sleep(1000)
    res = await axios(options)
  }
  const retjson = res.data
  // console.log(`Return {{${new Date().getTime() - startTime}ms}}`, retjson)
  return retjson
}

export default httpdo
