import {
PRESS_LINK
} from "../actionTypes/modelActionTypes";

const INITIAL_STATE = { screen: '', history: [] }

export default function(storeData=INITIAL_STATE, action) {
  switch (action.type) {
    case PRESS_LINK:
      return {
        ...storeData,
        screen: action.payload
      };
    default:
      return storeData;
  }
}
