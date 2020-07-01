import {
    FETCH_NEWS
} from './actionTypes'

import { server } from '../env'

export const getNews = async (dispatch) => {
    await fetch(server + 'api/news')
        .then(async res => {
            if (!res.ok) throw Error(res.status)
            return await res.json()
        })
        .then((res) => {
            dispatch({ type: FETCH_NEWS, payload: res })
            dispatch({type: 'REFRESHING_FALSE'})
        }).catch(err => {console.log('getNews err - ', err); dispatch({type: 'REFRESHING_TRUE'}); getNewsFromGithub(dispatch);  })
}

export const getNewsFromGithub = async (dispatch) => {
    console.log('fetching from github...');
    await fetch('https://raw.githubusercontent.com/LexaPetrov/rn-digital-news/master/backend/fetch.json')
        .then(async res => {
            if (!res.ok) throw Error(res.status)
            return await res.json()
        })
        .then((res) => {
            dispatch({ type: FETCH_NEWS, payload: res })
            dispatch({type: 'REFRESHING_FALSE'})
        }).catch(err => { console.error('getNewsFromGithub ERROR - ', err) })
}

export const sendMessage = (data) => {
    //form method POST bla bla bla...
    console.log('sendMessage - ', data);
}