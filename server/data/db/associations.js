export default (models) => {
    const {
        User,
        Post,
        PostReaction,
        Comment,
        Image,
        CommentReaction
    } = models;


    Image.hasOne(User);
    Image.hasOne(Post);

    User.hasMany(Post);
    User.hasMany(Comment);
    User.hasMany(PostReaction);
    User.belongsTo(Image);
    User.hasMany(CommentReaction);

    Post.belongsTo(Image);
    Post.belongsTo(User);
    Post.hasMany(PostReaction);
    Post.hasMany(Comment);

    Comment.belongsTo(User);
    Comment.belongsTo(Post);
    Comment.hasMany(CommentReaction);

    PostReaction.belongsTo(Post);
    PostReaction.belongsTo(User);
    
    CommentReaction.belongsTo(Comment);
    CommentReaction.belongsTo(User);
};
