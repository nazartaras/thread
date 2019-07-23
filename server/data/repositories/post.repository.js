import sequelize from '../db/connection';
import { PostModel, CommentModel, UserModel, ImageModel, PostReactionModel } from '../models/index';
import BaseRepository from './base.repository';
import {Op} from "sequelize";

const likeCase = bool => `CASE WHEN "postReactions"."isLike" = ${bool} THEN 1 ELSE 0 END`;
const dislikeCase = bool => `CASE WHEN "postReactions"."isDislike" = ${bool} THEN 1 ELSE 0 END`;

class PostRepository extends BaseRepository {
    async getPosts(filter) {
        const {
            from: offset,
            count: limit,
            type: type,
            userId
        } = filter;

        const where = {};
        if (type == 0){
            if (userId) {
                Object.assign(where, {userId});
            }}
        else if(type==1){
            if (userId) {
                Object.assign(where, {userId: {
                        [Op.ne]: userId
                    }});
            }
        }
        return this.model.findAll({
            where,
            attributes: {
                include: [
                    [sequelize.literal(`
                        (SELECT COUNT(*)
                        FROM "comments" as "comment"
                        WHERE "post"."id" = "comment"."postId")`), 'commentCount'],
                    [sequelize.fn('SUM', sequelize.literal(likeCase(true))), 'likeCount'],
                    [sequelize.fn('SUM', sequelize.literal(dislikeCase(true))), 'dislikeCount']
                ]
            },
            include: [{
                model: ImageModel,
                attributes: ['id', 'link']
            }, {
                model: UserModel,
                attributes: ['id', 'username'],
                include: {
                    model: ImageModel,
                    attributes: ['id', 'link']
                }
            }, {
                model: PostReactionModel,
                attributes: [],
                duplicating: false
            }],
            group: [
                'post.id',
                'image.id',
                'user.id',
                'user->image.id'
            ],
            order: [['createdAt', 'DESC']],
            offset,
            limit
        });
    }

    getPostById(id) {
        return this.model.findOne({
            group: [
                'post.id',
                'comments.id',
                'comments->user.id',
                'comments->user->image.id',
                'user.id',
                'user->image.id',
                'image.id'
            ],
            where: { id },
            attributes: {
                include: [
                    [sequelize.literal(`
                        (SELECT COUNT(*)
                        FROM "comments" as "comment"
                        WHERE "post"."id" = "comment"."postId")`), 'commentCount'],
                    [sequelize.fn('SUM', sequelize.literal(likeCase(true))), 'likeCount'],
                    [sequelize.fn('SUM', sequelize.literal(dislikeCase(true))), 'dislikeCount']
                ]
            },
            include: [{
                model: CommentModel,
                include: {
                    model: UserModel,
                    attributes: ['id', 'username'],
                    include: {
                        model: ImageModel,
                        attributes: ['id', 'link']
                    }
                }
            }, {
                model: UserModel,
                attributes: ['id', 'username'],
                include: {
                    model: ImageModel,
                    attributes: ['id', 'link']
                }
            }, {
                model: ImageModel,
                attributes: ['id', 'link']
            }, {
                model: PostReactionModel,
                attributes: []
            }]
        });
    }
    deletePostById(id){
        return this.model.destroy({
            where: { id },
            paranoid: true,
            timestamps: true
        });
    }
    restorePostById(id){
        return this.model.restore({
            where:{id}
        }
        );
    }
    updatePost(id, text){
        return this.model.update({body:text}, {where:{id:id}})
    }
}

export default new PostRepository(PostModel);
