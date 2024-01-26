import React from 'react';

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = React.useState<number | undefined>(undefined);

  function handleResize() {
    setWindowWidth(window.outerWidth);
  }

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowWidth;
};

export default useWindowWidth;
