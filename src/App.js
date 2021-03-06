import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import MyPage from "./components/MyPage";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import MovieList from "./components/MovieList";
import Review from "./components/Review";
import WriteReview from "./components/WriteReview";
import Nav from "./components/Nav";
import axios from "axios";
import PropTypes from "prop-types";

const IP_ADDRESS = "127.0.0.1"; //127.0.0.1 // AWS
const axiosInstance = axios.create({
  withCredentials: true,
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      userInfo: {},
      review: {},
      movie: {},
    };
    this.handleIsRefresh = this.handleIsRefresh.bind(this);
  }

  componentDidMount() {
    console.log(this.state.isLogin);
    let isAccess = localStorage.getItem("accessToken");
    console.log(isAccess);
    if (isAccess) {
      console.log("IN >>>>");
      this.handleIsRefresh();
    }
  }

  handleIsRefresh() {
    if (localStorage.getItem("accessToken")) {
      return axiosInstance
        .get(`http://${IP_ADDRESS}:5000/user/auth`, {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("accessToken")),
          },
        })
        .then((res) => {
          console.log(res);
          this.handleIsLoginChange(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  handleIsLoginChange = (res) => {
    localStorage.setItem("accessToken", JSON.stringify(res.accessToken));
    this.setState({ isLogin: true, userInfo: res }, () => {
      console.log(this.state);
    });
  };
  handleIsLogoutChange = () => {
    console.log(this.state.userInfo);
    localStorage.clear();
    this.setState({ isLogin: false, userInfo: {} }, () => {
      console.log(this.state);
    });
    this.props.history.push(`/`);
  };
  handleWriteReview = (data) => {
    this.setState({ movie: data });
    this.setState({ review: {} });
    this.props.history.push(`/movie/${data.movieId}/writeReview`);
  };
  handleCleanReview = () => {
    this.setState({ review: {} });
    this.setState({ movie: {} });
  };
  hadleReviewChangeByTitle = (review) => {
    this.setState({ review: review });
    this.setState({
      movie: { movieId: review.movieId, movieName: review.movieName },
    });
    this.props.history.push(
      `/movie/${review.movieId}/review/${review.reviewId}`
    );
  };
  hadleReviewChangeByEdit = (review) => {
    this.setState({ review: review });
    this.setState({
      movie: { movieId: review.movieId, movieName: review.movieName },
    });
    this.props.history.push(`/movie/${review.movieId}/writeReview`);
  };
  hadleNewReviewChange = (reviewId) => {
    axios
      .get(`http://${IP_ADDRESS}:5000/movie/reviewinfo/${reviewId}`)
      .then((res) => {
        this.setState({ review: res.data });
        this.props.history.push(
          `/movie/${this.state.movie.movieId}/review/${res.data.reviewId}`
        );
      })
      .catch((err) => console.log(err));
  };
  render() {
    const { isLogin, userInfo, review, movie } = this.state;
    console.log(this.state);
    return (
      <div>
        <Nav
          isLogin={isLogin}
          review={review}
          movie={movie}
          handleIsLogoutChange={this.handleIsLogoutChange.bind(this)}
        />
        <Switch>
          <Route
            path={`/user/signin`}
            render={() => (
              <SignIn
                isLogin={isLogin}
                userInfo={userInfo}
                handleIsLoginChange={this.handleIsLoginChange.bind(this)}
              />
            )}
          />
          <Route
            exact
            path={`/user/signup`}
            render={() => <SignUp isLogin={isLogin} userInfo={userInfo} />}
          />
          <Route
            exact
            path={`/user/mypage`}
            render={() => (
              <MyPage
                isLogin={isLogin}
                userInfo={userInfo}
                review={review}
                handleIsRefresh={this.handleIsRefresh}
                hadleReviewChangeByTitle={this.hadleReviewChangeByTitle.bind(
                  this
                )}
                hadleReviewChangeByEdit={this.hadleReviewChangeByEdit.bind(
                  this
                )}
                handleCleanReview={this.handleCleanReview.bind(this)}
              />
            )}
          />
          <Route
            exact
            path={`/movie/popular`}
            render={() => (
              <MovieList
                isLogin={isLogin}
                userInfo={userInfo}
                handleWriteReview={this.handleWriteReview.bind(this)}
                hadleReviewChangeByTitle={this.hadleReviewChangeByTitle.bind(
                  this
                )}
              />
            )}
          />
          <Route
            exact
            path={`/movie/${movie.movieId}/review/${review.reviewId}`}
            render={() => (
              <Review
                isLogin={isLogin}
                userInfo={userInfo}
                review={review}
                handleIsRefresh={this.handleIsRefresh}
                movie={movie}
              />
            )}
          />
          <Route
            exact
            path={`/movie/${movie.movieId}/writeReview`}
            render={() => (
              <WriteReview
                isLogin={isLogin}
                userInfo={userInfo}
                review={review}
                movie={movie}
                hadleNewReviewChange={this.hadleNewReviewChange.bind(this)}
              />
            )}
          />
          <Route
            path={`/`}
            render={() => {
              if (isLogin) {
                return <Redirect to={`/movie/popular`} />;
              }
              return <Redirect to={`/user/signin`} />;
            }}
          />
        </Switch>
      </div>
    );
  }
}
App.propTypes = {
  history: PropTypes.object,
};
export default withRouter(App);
