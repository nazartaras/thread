import profileRepository from '../../data/repositories/profile.repository';

export const updateProfile = (userId, user) => {
    console.log("haha")
    console.log(user);
    profileRepository.updateProfile(user);}