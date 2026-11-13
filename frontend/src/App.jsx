import axios from "axios";
const App = () => {
  const api = async () => {
    console.log("helllo");
    const res = await axios.get(
      "067c2f880a5abffff2d16df4083d87dd0f4b11b655339dae9bf3c362435ed8f8",
    );
    console.log(res.data);
  };

  return (
    <div>
      <button
        onClick={() => {
          api();
        }}
        className=" bg-amber-600  px-2 py-1.5 active:scale-95"
      >
        call
      </button>
    </div>
  );
};

export default App;
