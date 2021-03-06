import { PostReactionModel, PostModel } from '../models/index';
import BaseRepository from './base.repository';

class PostReactionRepository extends BaseRepository {
    getPostReaction(userId, postId) {
        return this.model.findOne({
            group: [
                'postReaction.id',
                'post.id'
            ],
            where: { userId, postId },
            include: [{
                model: PostModel,
                attributes: ['id', 'userId']
            }]
        });
    }
    getLikedPostsId(){
        return this.model.findAll({
            group: [
                'postReaction.id',
                'post.id'
            ],
            where:{isLike:true}
        })
    }
}

export default new PostReactionRepository(PostReactionModel);
