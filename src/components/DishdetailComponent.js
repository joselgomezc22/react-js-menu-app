import React, { Component } from 'react';

import { Card, CardImg, CardText, CardBody, CardTitle , List } from 'reactstrap';
class DishDetail extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
            selectedDish: null
        }
    }
    renderDish(selectedDish){
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

    render() {
        
        const selectedDish = this.props.selecteddish;
        if (selectedDish != null ){
            const coments = selectedDish.comments.map((comment) => {
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
                <div className="row">
                    <div  className="col-12 col-md-5 m-1">
                        {this.renderDish(selectedDish)}
                    </div>
                    <div  className="col-12 col-md-5 m-1">
                        <h2 >Comments</h2>
                        <List type="unstyled">
                            {coments}
                        </List>
                    </div>
                </div>
                
            );
        }
        }

            


}

export default DishDetail ;