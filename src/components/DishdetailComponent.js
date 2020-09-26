import React from 'react';
import { Card, CardImg, CardImgOverlay,CardText, CardBody,CardTitle } from 'reactstrap';
function RenderDish({dish})
{
  if (dish != null)
    return(
        <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
  else
    return(
        <div></div>
    );
}
function RenderComments({dish})
{
  if(dish!=null){
    var commentList = dish.comments.map(comment => {
      return (
        <ul key={comment.id} className="list-unstyled">
          <li>{comment.comment}</li>
          <br/>
          <li>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
        </ul>
      );
    });

    return(
      <Card>
        <CardTitle>
          <h4>Comments</h4>
        </CardTitle>
        <CardBody>
            <CardText>{commentList}</CardText>
        </CardBody>
      </Card>
    );
  }
  else
    return(
      <div />
    );
}
const Dishdetail = (props) => {
  return (
    <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={props.dish} />
        </div>
        <div className="col-12 col-md-5 m-1">
          <RenderComments dish={props.dish} />
        </div>
    </div>
  );
}
export default Dishdetail;
