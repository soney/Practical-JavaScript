import React from 'react';

export default function App() {
    return <div>
        <Component1 />
        <Component2 />
    </div>;
}

function useWindowSize() {
  const [size, setSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  React.useEffect(() => {
    function handleResize() {
      setSize({
        width: window.innerWidth, 
        height: window.innerHeight
      });
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener(
                        "resize", handleResize);
  }, []);
  return size;
}

function Component1() {
  const {width} = useWindowSize();
  const isMobile = width < 768;

  return <p>{isMobile ? 
             "Mobile" : 
             "Desktop"} (Width: {width})</p>;
}

function Component2() {
  const {height} = useWindowSize();

  return <div style={{ height }}><h1>Height: {height}</h1></div>;
}