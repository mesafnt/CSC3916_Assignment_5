// import React, { Component } from 'react';
// import {fetchMovie, postReview} from "../actions/movieActions";
// import {connect} from 'react-redux';
// import {Card, Form, ListGroup, ListGroupItem, Button} from 'react-bootstrap';
// import { BsStarFill } from 'react-icons/bs'
// import { Image } from 'react-bootstrap';
// //import {submitLogin} from "../actions/authActions";
// //import runtimeEnv from "@mars/heroku-js-runtime-env";


// class MovieDetail extends Component {

//     componentDidMount() {
//         const {dispatch} = this.props;
//         if (this.props.selectedMovie == null) {
//             dispatch(fetchMovie(this.props.movieId));
//         }
//     }

//     constructor(props) {
//         super(props);
//         this.updateDetails = this.updateDetails.bind(this)
//         this.submitReview = this.submitReview.bind(this)
//         this.state = {
//             review_details: {
//                 title: "",
//                 rating: 0,
//                 small_quote: ""
//             }
//         }

//         this.rating = ''
//         this.message = ''
//     }



//     submitReview(){
//         console.log("in submit review")
//         const {dispatch} = this.props;
//         if (this.state.review_details.small_quote === "" || this.state.review_details.rating === 0) {
//             alert("Empty rating or review");
//         } else {
//             this.state.review_details.title = this.props.selectedMovie.title;
//             console.log('review_details', this.state.review_details)
//             dispatch(postReview(this.state.review_details));
//         }

//     }

//     updateDetails(event) {

//         // console.log("in update details")
//         let updateDetails = Object.assign({}, this.state.review_details)

//         updateDetails[event.target.id] = event.target.value;

//         this.setState({
//             review_details: updateDetails
//         })
//         // console.log('update details', updateDetails)
//     }
// render() {
//     const DetailInfo = () => {
//         if (!this.props.selectedMovie) {
//             return <div>Loading....</div>
//         }

//         return (
//             <Card>
//                 <Card.Header>Movie Detail</Card.Header>
//                 <Card.Body>
//                     <Image className="image" src={this.props.selectedMovie.imageUrl} thumbnail/>
//                 </Card.Body>
//                 <ListGroup>
//                     <ListGroupItem>{this.props.selectedMovie.title}</ListGroupItem>
//                     <ListGroupItem>
//                         {this.props.selectedMovie.actors.map((actor, i) =>
//                             <p key={i}>
//                                 <b>{actor.actor_name}</b> {actor.character_name}
//                             </p>)}
//                     </ListGroupItem>
//                     <ListGroupItem><h4><BsStarFill/> {this.props.selectedMovie.averaged_rating}</h4></ListGroupItem>
//                 </ListGroup>
//                 <Card.Body>
//                     {this.props.selectedMovie.reviews.map((review, i) =>
//                         <p key={i}>
//                             <b>{review.username}</b>&nbsp; {review.small_quote}
//                             &nbsp;  <BsStarFill/> {review.rating}
//                         </p>
//                     )}
//                 </Card.Body>
//                 <Form>
//                     <Form.Group controlId="rating">
//                         <Form.Label>Rating</Form.Label>
//                         <Form.Control onChange={this.updateDetails} value={this.state.review_details.rating}
//                                       type="number" min="1" max="5"/>
//                     </Form.Group>

//                     <Form.Group controlId="small_quote">
//                         <Form.Label>Review</Form.Label>
//                         <Form.Control onChange={this.updateDetails} value={this.state.review_details.small_quote}
//                                       type="text" placeholder="Write a new review"/>
//                     </Form.Group>

//                     <Button onClick={this.submitReview}>Submit Review</Button>
//                 </Form>
//             </Card>
//         )
//     }

//     return (
//         <DetailInfo />
//     )
// }
// }
// const mapStateToProps = state => {
//     return {
//         selectedMovie: state.movie.selectedMovie
//     }
// }

// export default connect(mapStateToProps)(MovieDetail);

import React, { Component } from 'react';
import { fetchMovie } from "../actions/movieActions";
import {connect} from 'react-redux';
import { Card, ListGroup, ListGroupItem, Form, FormGroup, Col, FormLabel, FormControl, Button } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs'
import { Image } from 'react-bootstrap';
const env = process.env;
class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.updateDetails = this.updateDetails.bind(this);
        this.reviewSub = this.reviewSub.bind(this);

        this.state = {
            details:{
                review: '',
                rating: 0
            }
        };
    }

    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.selectedMovie == null) {
            dispatch(fetchMovie(this.props.movieId));

        }
    }

    updateDetails(event){
        let updateDetails = Object.assign({}, this.state.details);

        updateDetails[event.target.id] = event.target.value;
        this.setState({
            details: updateDetails
        });
    }

    reviewSub() {
        //const env = runtimeEnv();

        var json = {
            Review: this.state.details.review,
            Rating: this.state.details.rating,
            Movie_ID: this.props.movieId
        };

        return fetch(`${env.REACT_APP_API_URL}/reviews`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(json),
            mode: 'cors'})
            .then( (response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then( (res) => {
                window.location.reload();
            })
            .catch( (e) => console.log(e) );

    }

    render() {
        const DetailInfo = () => {
            if (!this.props.selectedMovie) {
                return <div>Loading....</div>
            }
            return (
                <Card>
                    <Card.Header>Movie Detail</Card.Header>
                    <Card.Body>
                        <Image className="image" src={this.props.selectedMovie.ImageUrl} thumbnail />
                    </Card.Body>
                    <ListGroup>
                        <ListGroupItem>{this.props.selectedMovie.Title}</ListGroupItem>
                        <ListGroupItem>
                            {this.props.selectedMovie.Actors.map((actor, i) =>
                                <p key={i}>
                                    <b>{actor.Actor_name}</b> {actor.Character_name}
                                </p>)}
                        </ListGroupItem>
                        <ListGroupItem><h4><BsStarFill/> {this.props.selectedMovie.averageRating}</h4></ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        {this.props.selectedMovie.reviews.map((review, i) =>
                            <p key={i}>
                                <b>{review.username}</b>&nbsp; {review.Review}
                                &nbsp;  <BsStarFill /> {review.Rating}
                            </p>
                        )}
                    </Card.Body>
                </Card>
            )
        }

        return (
            <div>
                <DetailInfo currentMovie = {this.props.selectedMovie} />
                <Form horizontal>
                    <FormGroup controlId = "review">
                        <Col componentClass={FormLabel} sm={2}>
                            Review
                        </Col>
                        <Col sm={10}>
                            <FormControl onChange={this.updateDetails} value={this.state.details.review} type="text" placeholder="type review here..." />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="rating">
                        <Col componentClass={FormLabel} sm={2}>
                            Rating
                        </Col>
                        <Col sm={10}>
                            <FormControl onChange={this.updateDetails}
                                         value={this.state.details.rating}
                                         type="number" min="1" max="5" />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button onClick={this.reviewSub}>Submit</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedMovie: state.movie.selectedMovie,
    }
}

export default connect(mapStateToProps)(MovieDetail);