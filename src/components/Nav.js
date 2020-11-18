import React from "react";
import { Link, Switch, Route, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isLogin, review, movie, handleIsLogoutChange } = this.props;
    if (isLogin) {
      return (
        <Switch>
          <Route
            path={`/user/mypage`}
            render={() => {
              return (
                <div>
                  <Link to={`/movie/popular`}>
                    <button
                      style={{
                        width: "150px",
                        height: "50px",
                        margin: "5px",
                        borderRadius: "5px",
                        backgroundColor: "ivory",
                      }}
                      type="submit"
                    >
                      Netflex
                    </button>
                  </Link>
                  <button
                    style={{
                      width: "150px",
                      height: "50px",
                      margin: "5px",
                      borderRadius: "5px",
                      backgroundColor: "ivory",
                    }}
                    type="submit"
                    onClick={handleIsLogoutChange}
                  >
                    로그아웃
                  </button>
                </div>
              );
            }}
          />
          <Route
            exact
            path={`/movie/popular`}
            render={() => {
              return (
                <div>
                  <Link to={`/movie/popular`}>
                    <button
                      style={{
                        width: "150px",
                        height: "50px",
                        margin: "5px",
                        borderRadius: "5px",
                        backgroundColor: "ivory",
                      }}
                      type="submit"
                    >
                      Netflex
                    </button>
                  </Link>
                  <Link to={`/user/mypage`}>
                    <button
                      style={{
                        width: "150px",
                        height: "50px",
                        margin: "5px",
                        borderRadius: "5px",
                        backgroundColor: "ivory",
                      }}
                      type="submit"
                    >
                      마이페이지
                    </button>
                  </Link>
                </div>
              );
            }}
          />
          <Route
            exact
            path={`/movie/${movie.movieId}`}
            render={() => {
              return (
                <div>
                  <Link to={`/movie/popular`}>
                    <button
                      style={{
                        width: "150px",
                        height: "50px",
                        margin: "5px",
                        borderRadius: "5px",
                        backgroundColor: "ivory",
                      }}
                      type="submit"
                    >
                      Netflex
                    </button>
                  </Link>
                  <Link to={`/user/mypage`}>
                    <button
                      style={{
                        width: "150px",
                        height: "50px",
                        margin: "5px",
                        borderRadius: "5px",
                        backgroundColor: "ivory",
                      }}
                      type="submit"
                    >
                      마이페이지
                    </button>
                  </Link>
                </div>
              );
            }}
          />
          <Route
            exact
            path={`/movie/${movie.movieId}/review/${review.reviewId}`}
            render={() => {
              return (
                <div>
                  <img src="https://ifh.cc/g/lkvEpk.jpg"></img>
                  <Link to={`/movie/popular`}>
                    <button
                      style={{
                        width: "150px",
                        height: "50px",
                        margin: "5px",
                        borderRadius: "5px",
                        backgroundColor: "ivory",
                      }}
                      type="submit"
                    >
                      Netflex
                    </button>
                  </Link>
                  <Link to={`/user/mypage`}>
                    <button
                      style={{
                        width: "150px",
                        height: "50px",
                        margin: "5px",
                        borderRadius: "5px",
                        backgroundColor: "ivory",
                      }}
                      type="submit"
                    >
                      마이페이지
                    </button>
                  </Link>
                </div>
              );
            }}
          />
          <Route
            exact
            path={`/movie/${movie.movieId}/writeReview`}
            render={() => {
              return (
                <div>
                  <img src="https://ifh.cc/g/lkvEpk.jpg"></img>
                  <Link to={`/movie/popular`}>
                    <button
                      style={{
                        width: "150px",
                        height: "50px",
                        margin: "5px",
                        borderRadius: "5px",
                        backgroundColor: "ivory",
                      }}
                      type="submit"
                    >
                      Netflex
                    </button>
                  </Link>
                  <Link to={`/user/mypage`}>
                    <button
                      style={{
                        width: "150px",
                        height: "50px",
                        margin: "5px",
                        borderRadius: "5px",
                        backgroundColor: "ivory",
                      }}
                      type="submit"
                    >
                      마이페이지
                    </button>
                  </Link>
                </div>
              );
            }}
          />
        </Switch>
      );
    } else {
      return (
        <Switch>
          <Route
            path={`/user/signin`}
            render={() => {
              return (
                <div>
                  <Link to={`/user/signin`}>
                    <button
                      style={{
                        width: "150px",
                        height: "50px",
                        margin: "5px",
                        borderRadius: "5px",
                        backgroundColor: "ivory",
                      }}
                      type="submit"
                    >
                      Netflex
                    </button>
                  </Link>
                </div>
              );
            }}
          />
          <Route
            path={`/user/signup`}
            render={() => {
              return (
                <div>
                  <Link to={`/user/signin`}>
                    <button
                      style={{
                        width: "150px",
                        height: "50px",
                        margin: "5px",
                        borderRadius: "5px",
                        backgroundColor: "ivory",
                      }}
                      type="submit"
                    >
                      Netflex
                    </button>
                  </Link>
                </div>
              );
            }}
          />
        </Switch>
      );
    }
  }
}
Nav.propTypes = {
  history: PropTypes.object,
  isLogin: PropTypes.bool,
  review: PropTypes.object,
  movie: PropTypes.object,
  handleIsLogoutChange: PropTypes.func,
};
export default withRouter(Nav);
