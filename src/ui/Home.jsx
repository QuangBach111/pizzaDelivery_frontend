import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {
  const { username } = useSelector((state) => state.user);
  return (
    <div className="my-10 text-center">
      <h1 className="mb-8 text-xl font-semibold sm:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username === '' ? (
        <CreateUser />
      ) : (
        <Button to="/menu" type="primary">Countinue ordering, {username}</Button>
      )}
    </div>
  );
}

export default Home;
