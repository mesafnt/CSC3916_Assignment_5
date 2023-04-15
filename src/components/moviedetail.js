import React, { Component } from 'react';
import { fetchMovie } from "../actions/movieActions";
import {connect} from 'react-redux';
import {Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs'
import { Image } from 'react-bootstrap';
//import {submitLogin} from "../actions/authActions";


class MovieDetail extends Component {

    
    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.selectedMovie == null) {
            dispatch(fetchMovie(this.props.movieId));
        }
    }
    

    //need constructor to allow user's reviews
    constructor(props){
        super(props);
        this.modifyDetails = this.modifyDetails.bind(this)
        this.movieReviews = this.movieReviews.bind(this)
        this.state = {
            review_details:{
                title: "",
                review: "",
                rating: 0
            }
        }
        //user will give rating and comment
        this.rating = ''
        this.message = ''
    }

    modifyDetails(event){
        let modifyDetails = Object.assign({}, this.state.review_details)

        modifyDetails[event.target.id] = event.target.value;

        this.setState({
            review_details: modifyDetails
        })
    }

    movieReviews(){
        const {dispatch} = this.props;
        
        if(this.state.review_details.review === "" || this.state.review_details.rating === 0) {
            alert("Empty review");
        }
        else{
            this.setState().review_details.title = this.props.selectedMovie.title;
            console.log('review_details', this.state.review_details)
            dispatch(makeReview(this.state.review_details));
        }
    }

    render() {
        //const DetailInfo = () => {
            if (!this.props.selectedMovie) {
                return <div>Loading....</div>
            }

            return (
                <Card>
                    <Card.Header>Movie Detail</Card.Header>
                    <Card.Body>
                        <Image className="image" src={this.props.selectedMovie.imageUrl} thumbnail />
                    </Card.Body>
                    <ListGroup>
                        <ListGroupItem>{this.props.selectedMovie.title}</ListGroupItem>
                        <ListGroupItem>
                            {this.props.selectedMovie.Actors.map((actor, i) =>
                                <p key={i}>
                                    <b>{actor.ActorName}</b> {actor.CharacterName}
                                </p>)}
                        </ListGroupItem>
                        <ListGroupItem><h4><BsStarFill/> {this.props.selectedMovie.avgRating}</h4></ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        {this.props.selectedMovie.reviews.map((review, i) =>
                            <p key={i}>
                                <b>{review.username}</b>&nbsp; {review.review}
                                &nbsp;  <BsStarFill /> {review.rating}
                            </p>
                        )}
                    </Card.Body>
                    <Form>
                        <Form.Group controlId='rating'>
                            <Form.Label>Rating</Form.Label>
                            <FormControl onChange={this.modifyDetails} value={this.state.review_details.rating}
                            type="number" min="1" max="5"/>
                        </Form.Group>
                        <Form.Group controlId='review'>
                            <Form.Label>Review</Form.Label>
                            <FormControl onChange={this.modifyDetails} value={this.state.review_details.review}
                            type="text" placeholder="Write a review"/>
                        </Form.Group>
                        <Button onClick={this.movieReviews}>Submit review</Button>
                    </Form>
                </Card>
            )
        //}
        /*
        return (
            <DetailInfo />
        )
        */
    }
}

const mapStateToProps = state => {
    return {
        selectedMovie: state.movie.selectedMovie
    }
}

export default connect(mapStateToProps)(MovieDetail);