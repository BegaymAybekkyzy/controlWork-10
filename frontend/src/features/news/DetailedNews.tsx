import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { fetchNewsById } from './newsThunks.ts';
import { selectFetchLoading, selectOneNews } from './newsSlice.ts';
import Loader from '../../components/UI/Loader/Loader.tsx';
import dayjs from 'dayjs';
import { apiUrl } from '../../constants.ts';
import {
  deleteComments,
  fetchCommentsByNews,
} from '../comments/commentsThunks.ts';
import {
  selectCommentsByNews,
  selectCommentsFetchLoading,
} from '../comments/commentsSlice.ts';
import CommentCard from '../comments/copmonents/commentCard/commentCard.tsx';
import CommentForm from '../comments/copmonents/commentForm/commentForm.tsx';
import NotImage from '../../.././src/assets/noImage.jpeg';


const DetailedNews = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();

  const news = useAppSelector(selectOneNews);
  const comments = useAppSelector(selectCommentsByNews);
  const newsLoading = useAppSelector(selectFetchLoading);
  const commLoading = useAppSelector(selectCommentsFetchLoading);

  let imagePath = NotImage;

  if (news && news.image) {
    imagePath = apiUrl + 'images' + '/' + news.image;
  }



  useEffect(() => {
    if (id) {
      dispatch(fetchNewsById(id));
      dispatch(fetchCommentsByNews(id));
    }
  }, [dispatch, id]);

  const removeComment = async (NewsId: string, commentId: string) => {
    let warning = confirm('Are you sure you want to remove?');

    if (warning) {
      await dispatch(deleteComments(commentId));
      await dispatch(fetchCommentsByNews(NewsId));
    }
    return;
  };

  let newsContent: React.ReactNode;

  if (newsLoading) {
    newsContent = (
      <div
        style={{height: '80vh'}}
        className="d-flex align-items-center justify-content-center"
      >
        <Loader/>
      </div>
    );
  }

  if (news) {
    newsContent = (
      <>
        <h1 className="mb-3">{news.title}</h1>
        <span className="d-block mb-5 text-secondary fst-italic">
          At {dayjs(news.created_at).format('DD.MM.YYYY HH:mm')}
        </span>
        <div className="mb-3 w-25">
          <img src={imagePath} alt={news.title} className="d-block w-100 h-auto" />
        </div>
        <p>{news.description}</p>
      </>
    );
  }

  let commentContent: React.ReactNode;

  if (commLoading) {
    commentContent = (
      <div
        style={{height: '80vh'}}
        className="d-flex align-items-center justify-content-center"
      >
        <Loader/>
      </div>
    );
  }

  if (comments.length > 0 && id) {
    commentContent = (
      <>
        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            author={comment.author}
            deleteComment={removeComment}
            newsId={id}
            commId={String(comment.id)}
            text={comment.text}
          />
        ))}
      </>
    );
  }

  if (comments.length === 0) {
    commentContent = <p>No comments</p>;
  }

  return (
    <>
      <main className="mb-3">
        <div className="mb-3">{newsContent}</div>

        <hr/>
        <div className="mb-5">
          <h2>Comments</h2>
          <div className="overflow-x-auto" style={{height: '30vh'}}>
            {commentContent}
          </div>
        </div>
      </main>

      <hr/>
      <div className="mb-5">
        <h3>Add new comment</h3>
        {id ? (
          <CommentForm newsId={id}/>
        ) : (
          <p>There's been an error! Incorrect news id</p>
        )}
      </div>
    </>
  );
};

export default DetailedNews;
