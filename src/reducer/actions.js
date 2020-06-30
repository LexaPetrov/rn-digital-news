import {
    FETCH_NEWS
} from './actionTypes'

import {server} from '../env'

export const getNews = async (dispatch) => {
  await  fetch(server + 'api/news')
        .then(async res => {
            if (!res.ok) throw Error(res.status)
            return await res.json()
        })
        .then((res) => {
            dispatch({ type: FETCH_NEWS, payload: res})
        }).catch(err => { console.error('getNews ERROR - ', err)})
}