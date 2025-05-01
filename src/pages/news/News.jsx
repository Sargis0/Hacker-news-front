import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {fetchNews} from "../../store/newsSlice.js";
import "./News.css";

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

export const News = () => {
    const dispatch = useDispatch();
    const {newsList, status, error, page, hasMore} = useSelector((state) => state.news);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchNews({page: 1, limit: 10}));
        }
    }, [dispatch, status]);

    const handleLoadMore = () => {
        if (hasMore && status !== "loading") {
            dispatch(fetchNews({page, limit: 10}));
        }
    };

    return (
        <div className="news-page">
            <div className="news-container">
                <ol className="news-list">
                    {newsList.map((item, index) => (
                        <li key={`${item.id}-${index}`} className="news-item">
                            <div className="news-title">
                                <a
                                    href={item.url || '#'}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {item.title}
                                </a>
                                {item.url && isValidUrl(item.url) && (
                                    <span className="news-url"> ({new URL(item.url).hostname})</span>
                                )}
                            </div>
                            <div className="news-meta">
                                {item.points} points by {item.author?.username} |{" "}
                                {new Date(item.createdAt).toLocaleString()} |{" "}
                                <Link to={`/item/${item._id}`} className="comments-link">
                                    {item.commentCount || 0} comments
                                </Link>
                            </div>
                        </li>
                    ))}
                </ol>

                {status === "loading" && <p>Loading...</p>}
                {error && <p className="error">{error}</p>}
                {hasMore && (
                    <button className="load-more" onClick={handleLoadMore}>
                        More
                    </button>
                )}
            </div>
        </div>
    );
};