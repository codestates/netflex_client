import React from "react";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

class MovieReviewListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.likeClick = this.likeClick.bind(this);
  }
  likeClick = () => {
    const { reviewId, title } = this.props;
    axios.post(`http://localhost:5000/movie/reviewinfo/${reviewId}`);
  };

  render() {
    const { reviewId, title } = this.props;
    return (
      <div>
        <Link to={`/movie/movieId/review/reviewId`}>{`${title}`}</Link>
        <button onClick={this.likeClick}>좋아요</button>
      </div>
    );
  }
}
MovieReviewListEntry.propTypes = {
  reviewId: PropTypes.number,
  title: PropTypes.string,
};

export default withRouter(MovieReviewListEntry);
