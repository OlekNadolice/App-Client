import React, { useState, useEffect } from "react";

const useDocumentTitle = (title = "") => {
  const [documentTitle, setDocumentTitle] = useState(title);

  useEffect(() => {
    document.title = documentTitle;

    return () => (document.title = "");
  }, [documentTitle]);

  return { documentTitle, setDocumentTitle };
};

export default useDocumentTitle;
