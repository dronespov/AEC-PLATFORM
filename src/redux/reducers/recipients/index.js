// ** Initial State
const initialState = {
    recipientList: [],
    pendingCampaign: [],
    activeCampaign: [],
    completedCampaign: [],
    planData: null,
    isFetching: false
}

const recipients = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_RECIPIENT_LIST':
            return { ...state, recipientList: action.payload, isFetching: action.isFetching }
        case 'GET_CAMPAIGN_PENDING':
            return { ...state, pendingCampaign: action.payload, isFetching: action.isFetching }  
        case 'GET_CAMPAIGN_ACTIVE':
            return { ...state, activeCampaign: action.payload, isFetching: action.isFetching }  
       case 'GET_CAMPAIGN_COMPLETED':
            return { ...state, completedCampaign: action.payload, isFetching: action.isFetching }  
        case 'GET_PLAN_DATA':
            return { ...state, planData: action.payload, isFetching: action.isFetching }  
        default:
            return { ...state }
    }
}

export default recipients