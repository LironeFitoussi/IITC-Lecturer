import "./App.css";
import useGetJokes from "./hooks/useGetJokes";
import { type Joke } from "./types";
// Components Imports
import NewJokeForm from "./components/NewJokeForm";

function App() {
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
        {data.data.map((j: Joke) => {
          return (
            <p key={j._id}>
              {j.content} {j.punchline}
            </p>
          );
        })}
      </div>
      <br />
      <NewJokeForm />
    </>
  );
}

export default App;
