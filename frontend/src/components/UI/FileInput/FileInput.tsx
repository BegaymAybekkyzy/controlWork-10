import React, { useRef, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
  helperText?: string;
  errors?: boolean;
}

const FileInput: React.FC<Props> = ({
  onChange,
  name,
  label,
  helperText,
  errors = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState("");

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename("");
    }
    onChange(e);
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <input
        style={{ display: "none" }}
        type="file"
        name={name}
        onChange={onFileChange}
        ref={inputRef}
      />

      <Form.Group>
        <Row className="align-items-center">
          <Col xs="auto">
            <Form.Control
              value={filename}
              onClick={activateInput}
              placeholder={label}
              isInvalid={errors}
              disabled
            />
            {helperText && (
              <Form.Text className={errors ? "text-danger" : ""}>
                {helperText}
              </Form.Text>
            )}
          </Col>
          <Col xs="auto">
            <Button variant="primary" onClick={activateInput}>
              Browse
            </Button>
          </Col>
        </Row>
      </Form.Group>
    </>
  );
};

export default FileInput;
