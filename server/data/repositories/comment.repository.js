import { CommentModel, UserModel, ImageModel, CommentReactionModel } from '../models/index';
import BaseRepository from './base.repository';
import sequelize from '../db/connection';

class CommentRepository extends BaseRepository {
    getCommentById(id) {
        return this.model.findOne({
            group: [
                'comment.id',
                'user.id',
                'user->image.id'
            ],
            where: { id },
            include: [{
                model: UserModel,
                attributes: ['id', 'username'],
                include: {
                    model: ImageModel,
                    attributes: ['id', 'link']
                }
            }]
        });
    }
    deleteCommentById(id){
        return this.model.destroy({
            where: { id },
            paranoid: true,
            timestamps: true
        });
    }
    updateComment(id,text){
        return this.model.update({body:text}, {where:{id:id}})
    }
    restoreCommentById(id){
        return this.model.restore({
            where:{id}
        }
        );
    }
}

export default new CommentRepository(CommentModel);
