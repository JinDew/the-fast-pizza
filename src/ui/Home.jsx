import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {
  const usernameInStock = useSelector((state) => state.user.username);
  return (
    <div className="text-xl font-semibold text-center mt-60 xl:mt-20 md:mt-40 text-stone-700 font-pizza">
      <h1 className="mb-8 md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Right from our oven, straight to you.
        </span>
      </h1>

      {usernameInStock === "" ? (
        <CreateUser />
      ) : (
        <Button to="/menu" type="primary">
          Welcome to order, {usernameInStock}
        </Button>
      )}
    </div>
  );
}

export default Home;
