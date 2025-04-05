import React from "react";
import { Button, Card } from "react-bootstrap";
import NotImage from "../../../../assets/noImage.jpeg";
import { apiUrl } from "../../../../constants.ts";
import { NavLink } from 'react-router-dom';

interface Props {
  title: string;
  datetime: string;
  text: string;
  image?: string | null;
  deletePost: (id: string) => void;
  id: string;
}

const NewsCard: React.FC<Props> = ({ title, text, datetime, image, deletePost, id }) => {
  let imagePath = NotImage;

  if (image) {
    imagePath = apiUrl + "images" + "/" + image;
  }

  return (
    <Card>
      <div className="d-flex justify-content-sm-between align-items-center">
        <div className="w-25">
          <Card.Img className="w-100" src={imagePath} />
        </div>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{text}</Card.Text>
          <Button variant="primary" onClick={()=> deletePost(id)}>Delete</Button>
          <Card.Footer className="bg-white">
            <cite className="blockquote-footer me-3">
              {datetime}
            </cite>
            <NavLink to={`news/${id}`}>Read full post</NavLink>
          </Card.Footer>
        </Card.Body>
      </div>
    </Card>
  );
};

export default NewsCard;
