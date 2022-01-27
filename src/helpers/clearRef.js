const clearRef = refArray => {
  refArray.forEach(e => {
    e.current.value = "";
  });
};

export default clearRef;
