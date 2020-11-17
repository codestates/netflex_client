import React from "react";
import { Route ,withRouter, Link, Router } from "react-router-dom";
import MovieReviewListEntry from "./MovieReviewListEntry";
import PropTypes from "prop-types";
import axios from "axios";
import Review from "./Review";
import WriteReview from "./WriteReview"

class MovieReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { reviews: [] , reviewId: 0};
    this.handleGo = this.handleGo.bind(this)
  }
  componentDidMount() {
    const { movieId } = this.props;
    axios.get(`http://54.180.63.153:5000/movie/${movieId}`).then(
      (res) => this.setState({ reviews: res.data.results }),
      () => {
        console.log(this.state.reviews);
      }
    );
  }


  handleGo = () =>{
    this.props.history.push(`/movie/reviewinfo/${this.state.reviewId}`)
  } 

  render() {
    const { reviews } = this.state;
    const { userInfo, movieId, history } = this.props;
    console.log(userInfo);
    console.log(movieId);
    console.log(reviews)
    console.log(history)
    return ( 
      <div>
 
            {reviews && reviews.map((review, index) => {return(
              <li key={index}>
                {console.log(review.reviewId)}
              <button onClick={()=> this.setState({reviewId: review.reviewId})
              , this.handleGo
            }>{`${review.title}`}</button>
              {/* <MovieReviewListEntry
              //   reviewId={review.reviewId}
              //   title={review.title}
              //   movieId={movieId}
              //   userInfo={userInfo}
              // /> */} 
              </li>
            )})}
  
    <Route path="/review" component={WriteReview} exact={true}/>

    </div>
    );
  }
}

MovieReviewList.propTypes = {
  movieId: PropTypes.number,
  userInfo: PropTypes.object,
  history: PropTypes.object
};
export default withRouter(MovieReviewList);
