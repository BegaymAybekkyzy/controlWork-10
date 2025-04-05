import React from "react";
import { Button, Card } from "react-bootstrap";
import NotImage from "../../../../assets/noImage.jpeg";
import { apiUrl } from "../../../../constants.ts";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../../app/hooks.ts";
import { selectDeleteLoading } from "../../newsSlice.ts";
import dayjs from "dayjs";

interface Props {
  title: string;
  datetime: string;
  text: string;
  image?: string | null;
  deletePost: (id: string) => void;
  id: string;
}

const NewsCard: React.FC<Props> = ({
  title,
  text,
  datetime,
  image,
  deletePost,
  id,
}) => {
  let imagePath = NotImage;
  const loading = useAppSelector(selectDeleteLoading);

  if (image) {
    imagePath = apiUrl + "images" + "/" + image;
  }

  return (
    <Card>
      <div className="d-flex justify-content-sm-between align-items-center">
        <div
          className="w-25 d-flex justify-content-center"
          style={{ height: "150px" }}
        >
          <Card.Img
            className="w-100 object-fit-cover d-block"
            src={imagePath}
          />
        </div>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{text}</Card.Text>
          <Card.Footer className="bg-white d-flex justify-content-sm-between align-items-center">
            <div>
              <cite className="blockquote-footer me-3">
                At {dayjs(datetime).format("DD.MM.YYYY HH:mm")}
              </cite>
            </div>
            <NavLink to={`news/${id}`}>Read full post</NavLink>
            <div>
              <Button
                variant="danger"
                disabled={loading}
                onClick={() => deletePost(id)}
              >
                Delete
              </Button>
            </div>
          </Card.Footer>
        </Card.Body>
      </div>
    </Card>
  );
};

export default NewsCard;
