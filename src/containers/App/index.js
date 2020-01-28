/* eslint-disable react-hooks/exhaustive-deps */
/**
 *
 * Main
 *
 */
import React, { createRef, useEffect, useReducer, useRef, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import 'cropperjs/dist/cropper.css';
import { Inputs } from '@buffetjs/custom';
import { GlobalStyle, Fonts } from '@buffetjs/styles';
import { Button } from '@buffetjs/core';
import Cropper from 'cropperjs';
import Pic from '../../assets/child.jpg';
import Canvas from '../../components/Canvas';
// import PropTypes from 'prop-types';
import getRoundedCanvas from './utils/getRoundedCanvas';
import getMaskedCanvas from './utils/getMaskedCanvas';

import reducer, { initialState } from './reducer';
import init from './init';

function App() {
  const [reducerState, dispatch] = useReducer(reducer, initialState, init);
  const [cropResult, setCropResult] = useState(null);
  const { cropMode, isMask } = reducerState.toJS();
  const imgRef = createRef();
  let cropper = useRef();

  useEffect(() => {
    cropper.current = new Cropper(imgRef.current, {
      // aspectRatio: 1,
      modal: false,
      movable: true,
      zoomable: true,
      cropBoxResizable: true,
    });

    return () => {
      if (cropper.current) {
        cropper.current.destroy();
      }
    };
  }, [cropper]);

  useEffect(() => {
    if (cropper) {
      if (isMask) {
        cropper.current.setAspectRatio(NaN);

        return;
      }

      let ratio = cropMode === 'round' || cropMode === 'square' ? 1 : 16 / 9;

      cropper.current.setAspectRatio(ratio);
    }
  }, [cropMode, isMask]);

  const isAvatar = cropMode === 'round';

  const handleChange = ({ target: { name, value } }) => {
    dispatch({
      type: 'ON_CHANGE',
      name,
      value,
    });
  };

  const handleClick = () => {
    if (cropper) {
      const croppedCanvas = cropper.current.getCroppedCanvas();
      let canvas = isAvatar ? getRoundedCanvas(croppedCanvas) : croppedCanvas;

      if (isMask) {
        canvas = getMaskedCanvas(croppedCanvas, imgRef.current, cropper.current);
      }

      setCropResult(canvas.toDataURL());
    }
  };

  const handleRotate = () => {
    if (cropper) {
      cropper.current.rotate(-45);
    }
  };

  return (
    <>
      <Fonts />
      <GlobalStyle />
      <Canvas isAvatar={isAvatar} isMask={isMask} />
      <Container fluid>
        <Row>
          <Col md={10} style={{ maxHeight: 500 }}>
            <img src={Pic} ref={imgRef} alt="kk" />
          </Col>
          <Col md={2}>
            <Row>
              <Col md={12}>
                <Inputs
                  type="enum"
                  label="Crop mode"
                  name="cropMode"
                  options={[
                    {
                      value: 'rectangle',
                      label: '16/9',
                    },
                    {
                      value: 'square',
                      label: 'square',
                    },
                    {
                      value: 'round',
                      label: 'Avatar',
                    },
                  ]}
                  onChange={handleChange}
                  value={cropMode}
                />
              </Col>
              <Col md={12}>
                <Inputs name="isMask" type="bool" value={isMask} onChange={handleChange} />
              </Col>
              <Col md={12}>
                <Button label="Rotate" type="button" onClick={handleRotate} />
                <hr />
              </Col>
              <Col md={12}>
                <Button label="See result" type="button" onClick={handleClick} />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h1>Result</h1>
          </Col>
          <Col md={8}>{cropResult && <img src={cropResult} alt="ll" style={{ maxHeight: '25%' }} />}</Col>
        </Row>
      </Container>
    </>
  );
}

App.defaultProps = {};
App.propTypes = {};

export default App;
