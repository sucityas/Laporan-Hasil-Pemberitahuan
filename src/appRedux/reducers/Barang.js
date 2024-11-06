import {
  DELETE_BARANG,
  GET_ALL_BARANG,
  STORE_BARANG,
  UPDATE_BARANG,
  START_EDITING,
  END_EDITING
} from "../actionTypes/modelActionTypes";

const INIT_STATE = {
  barangList: [
    {
      cif: 7411.68,
      hsCode: 3232323,
      negAsal: "US",
      jnsKms: "PK",
      seqPib: "121003004626"
    }
  ],
  barang: [],
  editing: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_BARANG: {
      return {
        ...state,
        barangList: action.payload
      };
    }
    case UPDATE_BARANG:
      return {
        ...state,
        barangList: state.barangList.map(barang =>
          barang.seqPib === action.payload.seqPib ? action.payload : barang
        ),
        barang: []
      };

    case DELETE_BARANG:
      return {
        ...state,
        barangList: state["barangList"].filter(
          barang => barang.seqPib !== action.payload
        ),
      };

    case STORE_BARANG:
      return {
        ...state,
        barangList: state["barangList"].concat([action.payload]),
        barang: []
      };

    case START_EDITING:
      return {
        ...state,
        editing: true,
        barang: action.payload
      };
    case END_EDITING:
      return {
        ...state,
        editing: false
      };

    default:
      return state;
  }
};
