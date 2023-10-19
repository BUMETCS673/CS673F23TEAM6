import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLocalState } from "./store/modules/user";
import Router from "./router";
import { BrowserRouter } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLocalState() as unknown as any);
    return () => {};
  }, []);
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
