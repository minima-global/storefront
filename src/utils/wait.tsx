import { Misc } from '../config'

export const wait = ( ms: number ) => new Promise(resolve => setTimeout(resolve, ms))

// wait(10*1000).then(() => saySomething("10 seconds")).catch(failureCallback)

export const waitFor = async (condFunc: () => Promise<boolean>) => {
  return new Promise<void>((resolve) => {
    if (condFunc()) {
      resolve()
    }
    else {
      setTimeout(async () => {
        await waitFor(condFunc)
        resolve()
    }, Misc.pollInterval)
    }
  })
}
