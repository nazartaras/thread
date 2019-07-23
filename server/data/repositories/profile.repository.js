import sequelize from '../db/connection';
import { PostModel, CommentModel, UserModel, ImageModel, PostReactionModel } from '../models/index';
import BaseRepository from './base.repository';
import {Op} from "sequelize";


class ProfileRepository extends BaseRepository {
    updateProfile(prof){
        return this.model.update({username:prof.username, email:prof.email,status:prof.status}, {where:{id:prof.id}})
    }
}


export default new ProfileRepository(UserModel);
