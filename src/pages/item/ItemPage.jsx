import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewsItem } from '../../store/newsSlice.js'
import { fetchComments, postComment } from '../../store/commentSlice';
import './ItemPage.css';

const isValidDate = (dateString) => {
    return dateString && !isNaN(Date.parse(dateString));
};

export const ItemPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { currentItem } = useSelector((state) => state.news);
    const { comments, status, error } = useSelector((state) => state.comments);
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [commentText, setCommentText] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);

    useEffect(() => {
        if (id && id !== 'undefined') {
            dispatch(fetchNewsItem(id));
            dispatch(fetchComments(id));
        }
    }, [dispatch, id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        try {
            await dispatch(postComment({
                newsId: id,
                text: commentText,
                parentCommentId: replyingTo
            })).unwrap();

            setCommentText('');
            setReplyingTo(null);
            dispatch(fetchComments(id));
        } catch (err) {
            console.error('Failed to post comment:', err);
        }
    };

    if (!currentItem) {
        return <div className="loading">Loading story...</div>;
    }

    return (
        <div className="item-page">
            <div className="item-header">
                <h1 className="item-title">
                    <a href={currentItem.url} target="_blank" rel="noreferrer">
                        {currentItem.title}
                    </a>
                    {currentItem.url && (
                        <span className="item-domain"> ({new URL(currentItem.url).hostname.replace('www.', '')})</span>
                    )}
                </h1>
                <div className="item-meta">
                    {currentItem.points || 0} points by {currentItem.author?.username || 'anonymous'} |
                    {isValidDate(currentItem.createdAt)
                        ? new Date(currentItem.createdAt).toLocaleString()
                        : 'recently'} |
                    <Link to="/news" className="back-link">back to news</Link>
                </div>
            </div>

            <div className="comments-section">
                <h2 className="comments-title">
                    {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
                    {status === 'loading' && ' (loading...)'}
                </h2>

                {error && status === 'failed' && (
                    <div className="comments-error">
                        Could not load comments
                    </div>
                )}

                {isAuthenticated ? (
                    <form onSubmit={handleSubmit} className="comment-form">
                        <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder={replyingTo ? "Write your reply..." : "Add your comment..."}
                            rows={3}
                            required
                        />
                        <div className="form-actions">
                            {replyingTo && (
                                <button
                                    type="button"
                                    onClick={() => setReplyingTo(null)}
                                    className="cancel-btn"
                                >
                                    Cancel Reply
                                </button>
                            )}
                            <button
                                type="submit"
                                className="submit-btn"
                                disabled={status === 'loading'}
                            >
                                {replyingTo ? 'Post Reply' : 'Post Comment'}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="login-prompt">
                        <Link to="/login">Login</Link> to participate in discussion
                    </div>
                )}

                <div className="comments-list">
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <CommentItem
                                key={comment._id}
                                comment={comment}
                                onReply={setReplyingTo}
                                depth={0}
                            />
                        ))
                    ) : (
                        status !== 'loading' && <div className="no-comments">No comments yet</div>
                    )}
                </div>
            </div>
        </div>
    );
};

const CommentItem = ({ comment, onReply, depth }) => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const maxDepth = 5;
    const indent = Math.min(depth, maxDepth) * 20;

    return (
        <div className="comment" style={{ marginLeft: `${indent}px` }}>
            <div className="comment-meta">
                <span className="comment-author">{comment.author?.username || 'anonymous'}</span>
                <span className="comment-time">
                    {new Date(comment.createdAt).toLocaleString()}
                </span>
            </div>
            <div className="comment-text">{comment.text}</div>

            {isAuthenticated && depth < maxDepth && (
                <button
                    onClick={() => onReply(comment._id)}
                    className="reply-btn"
                >
                    reply
                </button>
            )}

            {comment.replies?.length > 0 && (
                <div className="comment-replies">
                    {comment.replies.map((reply) => (
                        <CommentItem
                            key={reply._id}
                            comment={reply}
                            onReply={onReply}
                            depth={depth + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};