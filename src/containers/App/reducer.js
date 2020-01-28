/*
 *
 * Main reducer
 *
 */
import { fromJS } from 'immutable';

const initialState = fromJS({
  cropMode: 'rectangle',
  isMask: false,
  zoomable: true,
  movable: true,
});

const mainReducer = (state, action) => {
  switch (action.type) {
    case 'ON_CHANGE':
      return state.update(action.name, () => action.value);
    default:
      return state;
  }
};

export default mainReducer;
export { initialState };
