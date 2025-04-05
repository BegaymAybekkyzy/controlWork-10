import React from "react";
import { Button, Card } from "react-bootstrap";

interface Props {
  text: string;
  author: string;
  deleteComment: (newsId: string, commId: string) => void;
  newsId: string;
  commId: string;
}

const CommentCard: React.FC<Props> = ({
  text,
  author,
  deleteComment,
  newsId,
  commId,
}) => {
  return (
    <Card className="mb-2">
      <Card.Body>
        <div className="d-flex justify-content-sm-between align-items-center">
          <div>
            <b>{author}</b> : {text}
          </div>

          <div>
            <Button
              className="link-underline-primary"
              onClick={() => deleteComment(newsId, commId)}
            >
              Delete
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CommentCard;
