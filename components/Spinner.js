import { PulseLoader } from "react-spinners";

const Spinner = ({ fullWidth }) => {
  if (fullWidth) {
    return (
      <div className="w-full flex justify-center">
        <PulseLoader color={"#1E3A8A"} speedMultiplier={2} />
      </div>
    );
  }
  return (
    <div className="w-full flex justify-center">
      <PulseLoader color={"#1E3A8A"} speedMultiplier={2} />
    </div>
  );
};

export default Spinner;
