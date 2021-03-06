/**
 *
 * Canvas
 *
 */

// import PropTypes from 'prop-types';
import { createGlobalStyle } from 'styled-components';

const Canvas = createGlobalStyle`
  ${({ isAvatar, isMask }) => {
    if (isMask) {
      return `

    .cropper-view-box,
    .cropper-face {
      background-color: black;
      opacity: 1;
    }

      `;
    }

    if (isAvatar) {
      return `
      .cropper-view-box,
      .cropper-face {
        border-radius: 50%;
      }
      `;
    }

    return '';
  }}

  // // .cropper-container
  // .cropper-crop-box {
  //   position: relative;
  // }

  
  .pre {
    position: absolute;
    // top: 0;
    color: white;
  }
`;

Canvas.defaultProps = {};
Canvas.propTypes = {};

export default Canvas;
