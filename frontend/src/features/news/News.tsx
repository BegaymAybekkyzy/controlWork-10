import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectAllNews, selectFetchLoading } from "./newsSlice.ts";
import { deleteNews, fetchAllNews } from "./newsThunks.ts";
import { NavLink } from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader.tsx";
import NewsCard from "./components/NewsCard/NewsCard.tsx";

const News = () => {
  const dispatch = useAppDispatch();
  const allNews = useAppSelector(selectAllNews);
  const loading = useAppSelector(selectFetchLoading);

  useEffect(() => {
    dispatch(fetchAllNews());
  }, [dispatch]);

  const onDeleteNews = async (id: string) => {
    let warning = confirm("Are you sure you want to remove?");

    if (warning) {
      await dispatch(deleteNews(id));
      await dispatch(fetchAllNews());
    }
    return;
  };

  let content: React.ReactNode;

  if (loading) {
    content = (
      <div
        style={{ height: "80vh" }}
        className="d-flex align-items-center justify-content-center"
      >
        <Loader />
      </div>
    );
  }

  if (!loading && allNews.length > 0) {
    content = (
      <div className="d-grid gap-3 ">
        {allNews.map((item) => (
          <NewsCard
            key={item.id}
            title={item.title}
            text={item.description}
            datetime={item.created_at}
            image={item.image ? item.image : null}
            deletePost={onDeleteNews}
            id={String(item.id)}
          />
        ))}
      </div>
    );
  }

  if (allNews.length === 0) {
    content = <h2>No posts</h2>;
  }

  return (
    <main className="mb-5">
      <div className="d-flex justify-content-sm-between items-center">
        <h1>Posts</h1>
        <div>
          <NavLink to="/add-new-post" className="btn btn-primary">
            Add new post
          </NavLink>
        </div>
      </div>

      <div>{content}</div>
    </main>
  );
};

export default News;
