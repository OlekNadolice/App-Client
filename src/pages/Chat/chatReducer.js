export const initialState = {
  users: [],
  message: [],
  currentUser: "",
  currentUserName: "",
  messageInput: "",
};

const chatReducer = (state, action) => {
  switch (action.type) {
    case "FIND_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload[0],
        currentUserName: action.payload[1],
      };
    case "SEND_MESSAGE":
      return { ...state, message: [...state.message, action.payload] };

    case "RECEIVE_MESSAGE":
      return { ...state, message: [...state.message, action.payload] };
    case "FIND_CONVERSATIONS":
      return { ...state, message: action.payload };
    case "FETCH_USERS":
      return { ...state, users: action.payload };
  }
};

export default chatReducer;
