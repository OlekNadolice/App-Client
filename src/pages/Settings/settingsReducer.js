const reducer = (state, action) => {
  switch (action.type) {
    case "SUBMIT":
      return { ...state, submited: true };
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_CITY":
      return { ...state, city: action.payload };
    case "SET_BIO":
      return { ...state, bio: action.payload };
    case "CHANGE_FORM_CONTENT":
      return { ...state, currentFormContent: action.payload };
  }
};

export const formState = {
  currentFormContent: 1,
  submited: false,
  name: "",
  city: "",
  bio: "",
};

export default reducer;
