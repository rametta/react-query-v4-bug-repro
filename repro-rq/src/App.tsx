import { useQuery } from "@tanstack/react-query";
import { initialize } from "rapini-rq-v4-repro";
import axios from "axios";

const { queries } = initialize(axios);

const getTodos = () =>
  new Promise((res) => {
    setTimeout(() => {
      res({ hello: "world" });
    }, 1500);
  });

function App() {
  const query = useQuery({ queryKey: ["todos"], queryFn: getTodos });
  // const queryFromExternalPackage = queries.useListPets(); // uncomment this line to see the error in console

  return <div>look in the console</div>;
}

export default App;
