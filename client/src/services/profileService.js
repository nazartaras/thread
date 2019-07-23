import callWebApi from 'src/helpers/webApiHelper';

export const updateProfile = async(request)=>{
    const response = await callWebApi({
        endpoint: '/api/profile',
        type: 'PUT',
        request
    });
}