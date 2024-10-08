import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useTheme } from '../../apis/ThemeContext.jsx';

const ColorPicker = () => {
  const { themeColor, handleColorChange, resetToDefault } = useTheme();

  return (
    <Form.Group controlId="formColorPicker" className="mb-3 ms-5">
      <Form.Label className="font-semibold text-lg mb-2">Choose Color</Form.Label>
      <Row className="items-center">
        <Col xs="auto">
          <Form.Control
            type="color"
            value={themeColor}
            onChange={(e) => handleColorChange(e.target.value)}
            className="w-8 h-8 border-0 p-0 cursor-pointer rounded-full transition-transform transform hover:scale-110 focus:ring-0" 
          />
        </Col>
        <Col xs="auto">
          <Button
            onClick={resetToDefault}
            className="mt-1 bg-gray-300 text-gray-800 rounded-lg shadow hover:bg-gray-400 transition duration-200"
          >
            Reset
          </Button>
        </Col>
      </Row>
    </Form.Group>
  );
};

export default ColorPicker;
