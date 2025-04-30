import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../../store/newsSlice";
import "./News.css";

export const News = () => {
    const dispatch = useDispatch();
    const { newsList, status, error, page, hasMore } = useSelector((state) => state.news);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchNews({ page: 1, limit: 10 }));
        }
    }, [dispatch, status]);

    const handleLoadMore = () => {
        if (hasMore && status !== "loading") {
            dispatch(fetchNews({ page, limit: 10 }));
        }
    };

    return (
        <div className="news-container">
            <ol className="news-list">
                {newsList.map((item, index) => (
                    <li key={item._id} className="news-item">
                        <div className="news-title">
                            <a href={item.url} target="_blank" rel="noreferrer">{item.title}</a>
                            <span className="news-url"> ({new URL(item.url).hostname})</span>
                        </div>
                        <div className="news-meta">
                            {item.points} points by {item.author.username} |{" "}
                            {new Date(item.createdAt).toLocaleString()}
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
    );
};
