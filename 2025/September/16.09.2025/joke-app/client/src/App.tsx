import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import useGetJokes from "./hooks/useGetJokes";
import { getAllJokes } from "./services/jokes.service";

function App() {
  const [count, setCount] = useState(0);
  const { data, isLoading, isError } = useGetJokes();
  // console.log();
  if (isLoading) {
    return <h1>loading...</h1>;
  }
  if (isError) {
    return <h1>an error occured while loading your data</h1>;
  }

  return (
    <>
      <div>
        {data.data.map((j: any) => {
          return (
            <p>
              {j.content} {j.punchline}
            </p>
          );
        })}
      </div>
    </>
  );
}

export default App;
