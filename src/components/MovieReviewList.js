import React from "react";
import { withRouter } from "react-router-dom";
import MovieReviewListEntry from "./MovieReviewListEntry";
import PropTypes from "prop-types";
import axios from "axios";

const IP_ADDRESS = "127.0.0.1";

class MovieReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { reviews: [] };
  }
  componentDidMount() {
    const { movieId } = this.props;
    axios.get(`http://${IP_ADDRESS}:5000/movie/${movieId}`).then(
      (res) => this.setState({ reviews: res.data.results }),
      () => {
        console.log(this.state.reviews);
      }
    );
  }
  render() {
    const { reviews } = this.state;
    const { userInfo, movieId, hadleReviewChangeByTitle } = this.props;
    return !reviews ? (
      <div></div>
    ) : (
      <ul className='movieReview'>
        {reviews &&
          reviews.map((review, index) => (
            <React.Fragment key={index}>
              <MovieReviewListEntry
                reviewId={review.reviewId}
                title={review.title}
                movieId={movieId}
                userInfo={userInfo}
                hadleReviewChangeByTitle={hadleReviewChangeByTitle}
              />
            </React.Fragment>
          ))}
      </ul>
    );
  }
}
MovieReviewList.propTypes = {
  movieId: PropTypes.number,
  userInfo: PropTypes.object,
  hadleReviewChangeByTitle: PropTypes.func,
};
export default withRouter(MovieReviewList);
