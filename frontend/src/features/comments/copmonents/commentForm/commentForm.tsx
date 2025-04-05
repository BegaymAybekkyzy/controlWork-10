import React, { useState } from "react";
import { ICommentForm } from "../../../../types";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import { Button, Form } from "react-bootstrap";
import { selectCommentsCreateLoading } from "../../commentsSlice.ts";
import { createComment, fetchCommentsByNews } from "../../commentsThunks.ts";

interface Props {
  newsId: string;
}

const CommentForm: React.FC<Props> = ({ newsId }) => {
  const [form, setForm] = useState<ICommentForm>({
    author: "",
    text: "",
    news_id: Number(newsId),
  });

  const loading = useAppSelector(selectCommentsCreateLoading);
  const dispatch = useAppDispatch();

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(createComment(form));
    await dispatch(fetchCommentsByNews(newsId));
    setForm({
      author: "",
      text: "",
      news_id: Number(newsId),
    });
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <Form onSubmit={onSubmitForm}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          name="author"
          value={form.author}
          maxLength={255}
          disabled={loading}
          onChange={onChangeInput}
          type="text"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="text"
          value={form.text}
          required
          disabled={loading}
          onChange={onChangeInput}
          type="text"
        />
      </Form.Group>

      <Button
        disabled={loading}
        variant="primary"
        type="submit"
        className="me-2"
      >
        Add
      </Button>
    </Form>
  );
};

export default CommentForm;
