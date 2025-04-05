import React from 'react';
import { Button, Card } from 'react-bootstrap';
import NotImage from "../../../../assets/noImage.jpeg";
import { apiUrl } from '../../../../constants.ts';

interface Props {
  title: string;
  datetime: string;
  text: string;
  image: string | null;
}

const NewsCard: React.FC<Props> = ({title, text, datetime, image}) => {
  let imagePath = NotImage;

  if (image) {
    imagePath = apiUrl + "images" + '/' + image;
  }

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={imagePath} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {text}
        </Card.Text>
        <Button variant="primary">Delete</Button>
        <Card.Footer className="bg-white">
          <cite className="blockquote-footer" title="Source Title">{datetime}</cite>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default NewsCard;