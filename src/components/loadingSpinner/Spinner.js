import "./Spinner.css";

const Spinner = ({ size = "small", styles }) => {
  return (
    <div
      className={`spinner spinner-${size}`}
      style={styles}
      data-testid="spinner"
    ></div>
  );
};

export default Spinner;
