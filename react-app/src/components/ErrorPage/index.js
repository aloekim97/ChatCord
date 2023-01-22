import { useHistory } from "react-router-dom";
import "./index.css";
import errorGif from "../../assets/404gif.gif";

const PageNotFound = () => {
  const history = useHistory();


  return (

    <div className="error-page">
      <div className="error-page-left">
        <h1 className="error-page-title">WRONG TURN?</h1>
        <div className="error-page-text">
          You look lost, stranger. You know what helps when you're lost? A
          piping hot bowl of noodles. Take a seat, we're frantically at work
          here cooking up something good. Oh, you need something to read? These
          might help you:
        </div>
        <button
          className="return-btn"
          onClick={() => {
            history.push("/");
          }}
        >
          Return Home
        </button>
      </div>
      <div className="error-page-right">
        <img
          src={errorGif}
          alt="error-gif"
          className="error-img"
        />
      </div>
    </div>
  );
};

export default PageNotFound;
