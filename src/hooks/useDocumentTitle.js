import React, { useState, useEffect } from "react";

export const useDocumentTitle = (title = "") => {
  const [documentTitle, setDocumentTitle] = useState(title);

  useEffect(() => {
    document.title = documentTitle;

    return () => (document.title = "");
  }, [documentTitle]);

  return { documentTitle, setDocumentTitle };
};
