import React, { useState } from "react";
import { INewsForm } from "../../../../types";
import { Form, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import { selectCreateLoading } from "../../newsSlice.ts";
import FileInput from "../../../../components/UI/FileInput/FileInput.tsx";
import { createNews, fetchAllNews } from "../../newsThunks.ts";

const initialValues = {
  title: "",
  description: "",
  image: null,
};

const NewsForm = () => {
  const [form, setForm] = useState<INewsForm>(initialValues);
  const loading = useAppSelector(selectCreateLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
    await dispatch(createNews(form));
    await dispatch(fetchAllNews());
    setForm(initialValues);
    navigate("/");
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const fileInputChangeHandler = (
    eFile: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { files } = eFile.target;

    if (files) {
      setForm((prev) => ({ ...prev, image: files[0] }));
    }
  };

  return (
    <Form onSubmit={onSubmitForm}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          name="title"
          value={form.title}
          maxLength={255}
          required
          disabled={loading}
          onChange={onChangeInput}
          type="text"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          name="description"
          value={form.description}
          required
          disabled={loading}
          onChange={onChangeInput}
          type="text"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Image</Form.Label>
        <FileInput
          name="image"
          onChange={fileInputChangeHandler}
          label="image"
        />
      </Form.Group>

      <Button
        disabled={loading}
        variant="primary"
        type="submit"
        className="me-2"
      >
        Save
      </Button>
      <NavLink to="/" className="btn btn-secondary">
        Back to news
      </NavLink>
    </Form>
  );
};

export default NewsForm;
