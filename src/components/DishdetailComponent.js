import React, { Component } from 'react';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Card, CardImg, CardText, CardBody, CardTitle  , Breadcrumb , BreadcrumbItem , Button , Modal , ModalBody , ModalHeader , Label, Row } from 'reactstrap';
import { Link } from 'react-router-dom';

import { Loading } from './LoadingComponent';

function RenderDish({selectedDish}){
    return(
        <Card>
            <CardImg top src={selectedDish.image} alt={selectedDish.name} />
            <CardBody>
                <CardTitle>{selectedDish.name}</CardTitle>
                <CardText>{selectedDish.description}</CardText>
            </CardBody>
        </Card>
    );
}

function RenderComments ({ comments ,addComment ,dishId }){
    if (comments != null) {
        return(

            <div  className="col-12 col-md-5 m-1">
                <h2 >Comments</h2>
                <div type="unstyled">
                    {comments.map((comment) => {
                        return(
                            <div>
                                <ul>
                                    <li>{comment.comment}</li>
                                    <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </ul>
                            </div>
                        )
                    })}
                    <CommentForm dishId={dishId} addComment={addComment} />
                </div>
            </div>

        );
    }
}

const DishDetail = (props)=> {
    const selectedDish = props.dish;
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{selectedDish.name}</BreadcrumbItem>
                    </Breadcrumb>  
                </div>
        
                <div className="row">
                    <div  className="col-12 col-md-5 m-1">
                        <RenderDish selectedDish={selectedDish} />
                    </div>
                    <RenderComments comments={props.comments} 
                    addComment={props.addComment} 
                    dishId={selectedDish.id} />
                </div>
            </div>
            
        );   
    }
}


/******************************/
/*** Comment Form Component ***/
/******************************/
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
          };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }
      handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment)
      }
    render(){
        return(
            <div>
            <Button onClick={this.toggleModal}> <i className="fa fa-pencil"></i> Add Comment </Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader> New Comment </ModalHeader>
                <ModalBody>
                    <LocalForm className="p-3" onSubmit={this.handleSubmit}>
                        <Row className="form-group">
                            <Label for="rating">Rating</Label>
                            <Control.select className="form-control" model=".rating" id="rating" dynamic={false}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Control.select>       
                        </Row>
                        <Row className="form-group">
                            <Label for="author">Your Name </Label>
                            <Control.text model=".author" id="author" name="author" placeholder="Your Name" 
                            className="form-control" 
                            validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }} />
                            <Errors
                            className="text-danger"
                            model=".firstname"
                            show="touched"
                            messages={{
                                required: 'Required',
                                minLength: 'Must be greater than 2 characters',
                                maxLength: 'Must be 15 characters or less'
                            }}
                            />
                        </Row>
                        <Row className="form-group">
                            <Label for="comment">Your Name </Label>
                            <Control.textarea rows="5" model=".comment" id="comment" name="comment" placeholder="Commentary" className="form-control" />
                        </Row>
                        <Button type="submit" value="submit" color="primary">Send</Button>
                    </LocalForm>
                </ModalBody>
            </Modal>
            </div>
        );
    }
}

export default DishDetail;