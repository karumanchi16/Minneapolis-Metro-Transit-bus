import "./Spinner.css";

const Spinner = ({ size = "small", styles }) => {
  return <div className={`spinner spinner-${size}`} style={styles}></div>;
};

export default Spinner;
