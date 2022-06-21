import React, { Component } from 'react';

import { Card, CardImg, CardText, CardBody, CardTitle  , Breadcrumb , BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
  
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

       const DishDetail = (props)=> {
        const commentsArray = props.comments;
        const selectedDish = props.selecteddish;
        if (commentsArray != null ){
            console.log(commentsArray);
            const coments = commentsArray.map((comment) => {
                if (comment == null ){
    
                    return (
                        <div>
    
                        </div>
                    );
                    } else {
        
                        return (
                            <div>
                                <ul>
        
                                <li>{comment.comment}</li>
                                <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </ul>
                            </div>
                        );
                    }
        
                });

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
                    <div  className="col-12 col-md-5 m-1">
                        <h2 >Comments</h2>
                        <div type="unstyled">
                            {coments}
                        </div>
                    </div>
                </div>
                </div>
                
            );
        }
       }
        
        
        


export default DishDetail ;