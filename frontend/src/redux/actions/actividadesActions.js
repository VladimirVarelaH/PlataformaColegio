export const GET_ACTIVITIES = 'GET_ACTIVITIES';

export const getActivities = (activities) =>{
    return{
        type: GET_ACTIVITIES,
        payload: activities
    }
}


export const CHANGE_ADMIN = 'CHANGE_ADMIN';

export const changeAdmin = (status) =>{
    return{
        type: CHANGE_ADMIN,
        payload: status
    }
}

export const CHANGE_EDITING = 'CHANGE_EDITING';

export const changeEditing = (status) =>{
    return{
        type: CHANGE_EDITING,
        payload: status
    }
}

export const CHANGE_CREATING = 'CHANGE_CREATING';

export const changeCreating = (status) =>{
    return{
        type: CHANGE_CREATING,
        payload: status
    }
}

export const EXPORT_PROPS = "EXPORT_PROPS";

export const exportProps = (props)=>{
    return{
        type: EXPORT_PROPS,
        payload: props
    }
}

export const CHANGE_DELETING = 'CHANGE_DELETING';

export const changeDeleting = (status) =>{
    return{
        type: CHANGE_DELETING,
        payload: status
    }
}

export const EXPORT_DELETE_PROPS = "EXPORT_DELETE_PROPS";

export const exportDeleteProps = (props)=>{
    return{
        type: EXPORT_DELETE_PROPS,
        payload: props
    }
}