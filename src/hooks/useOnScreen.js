import React, { useState, useEffect } from "react";

const useOnScreen = options => {
  const [target, setTarget] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const callback = entries => {
    const [entry] = entries;
    if (entry.intersectionRatio > 0) {
      console.log(entry);
      setIsVisible(entry.isIntersecting);
      observer.unobserve(target);
    }
  };

  const observer = new IntersectionObserver(callback, options);

  useEffect(() => {
    target && observer.observe(target);

    return () => target && observer.unobserve(target);
  }, [target]);

  return { isVisible, setTarget };
};

export default useOnScreen;
