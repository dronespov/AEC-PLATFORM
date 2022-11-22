import { Service } from '@src/services/Service'

export const getAllData = (params) => {
  return async (dispatch) => {
    dispatch({ type: 'GET_RECIPIENT_LIST', payload: [], isFetching: true })

    await Service.post({ url: '/recipientsList', body: JSON.stringify(params) })
      .then((response) => {
        if (response) {
          dispatch({
            type: 'GET_RECIPIENT_LIST',
            payload: response.data,
            isFetching: false
          })
        }
      })
  }
}

export const getCampaignList = (params) => {

  return async (dispatch) => {

    if (params.status === '2') {
      dispatch({ type: 'GET_CAMPAIGN_COMPLETED', payload: [], isFetching: true })
    } else if (params.status === '1') {
      dispatch({ type: 'GET_CAMPAIGN_ACTIVE', payload: [], isFetching: true })
    } else {
      dispatch({ type: 'GET_CAMPAIGN_PENDING', payload: [], isFetching: true })
    }

    await Service.post({ url: '/campaign/lists', body: JSON.stringify(params) })
      .then((response) => {
        if (response) {
          if (params.status === '2') {
            dispatch({
              type: 'GET_CAMPAIGN_COMPLETED',
              payload: response.data,
              isFetching: false
            })
          } else if (params.status === '1') {
            dispatch({
              type: 'GET_CAMPAIGN_ACTIVE',
              payload: response.data,
              isFetching: false
            })
          } else {
            dispatch({
              type: 'GET_CAMPAIGN_PENDING',
              payload: response.data,
              isFetching: false
            })
          }
        }
      })
  }
}

export const getPlanData = (params) => {
  return async (dispatch) => {
    dispatch({ type: 'GET_PLAN_DATA', payload: null, isFetching: true })

    await Service.get({ url: '/planSubscribed' })
      .then((response) => {
        if (response) {
          dispatch({
            type: 'GET_PLAN_DATA',
            payload: response.data,
            isFetching: false
          })
        }
      })
  }
}
