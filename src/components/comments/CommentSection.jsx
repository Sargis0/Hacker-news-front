import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postComment, fetchComments } from '../../store/commentSlice';
import './CommentSection.css';

export const CommentSection = ({ newsId }) => {
    const dispatch = useDispatch();
    const { comments, status, error } = useSelector((state) => state.comments);
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [commentText, setCommentText] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);

    useEffect(() => {
        dispatch(fetchComments(newsId));
    }, [dispatch, newsId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        try {
            await dispatch(postComment({
                newsId,
                text: commentText,
                parentCommentId: replyingTo
            })).unwrap();

            setCommentText('');
            setReplyingTo(null);
            dispatch(fetchComments(newsId));
        } catch (err) {
            console.error('Failed to post comment:', err);
        }
    };

    return (
        <div className="comment-section">
            <h3>Comments</h3>

            {isAuthenticated ? (
                <form onSubmit={handleSubmit} className="comment-form">
                    <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder={replyingTo ? "Reply to comment..." : "Add a comment..."}
                        rows="3"
                    />
                    <div className="comment-actions">
                        {replyingTo && (
                            <button
                                type="button"
                                onClick={() => setReplyingTo(null)}
                                className="cancel-reply"
                            >
                                Cancel
                            </button>
                        )}
                        <button type="submit" disabled={status === 'loading'}>
                            {status === 'loading' ? 'Posting...' : replyingTo ? 'Reply' : 'Post Comment'}
                        </button>
                    </div>
                </form>
            ) : (
                <p className="login-prompt">Please login to comment</p>
            )}

            {status === 'loading' && !comments.length && <p>Loading comments...</p>}
            {error && <p className="error">Error: {error}</p>}

            <div className="comments-list">
                {comments.map((comment) => (
                    <CommentItem
                        key={comment.id}
                        comment={comment}
                        onReply={() => setReplyingTo(comment.id)}
                        newsId={newsId}
                        depth={0}
                    />
                ))}
            </div>
        </div>
    );
};

const CommentItem = ({ comment, onReply, newsId, depth }) => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const maxDepth = 5;
    const indent = Math.min(depth, maxDepth) * 20;

    return (
        <div
            className="comment-item"
            style={{ marginLeft: `${indent}px` }}
        >
            <div className="comment-header">
                <span className="comment-author">{comment.author?.username || 'Anonymous'}</span>
                <span className="comment-time">
                    {new Date(comment.createdAt).toLocaleString()}
                </span>
            </div>
            <div className="comment-text">{comment.text}</div>

            {isAuthenticated && depth < maxDepth && (
                <button
                    onClick={onReply}
                    className="reply-button"
                >
                    Reply
                </button>
            )}

            {comment.replies?.length > 0 && (
                <div className="replies">
                    {comment.replies.map((reply) => (
                        <CommentItem
                            key={reply.id}
                            comment={reply}
                            onReply={onReply}
                            newsId={newsId}
                            depth={depth + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
