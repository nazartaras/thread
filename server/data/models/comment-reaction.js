export default (orm, DataTypes) => {
    const CommentReaction = orm.define('commentReaction', {
        isLikeComment: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        isDislikeComment: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, {});

    return CommentReaction;
};
