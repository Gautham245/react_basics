import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody,CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal,ModalHeader, ModalBody,
      Row, Col, Input, Label} from 'reactstrap';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


function RenderDish({dish})
{
  if (dish != null)
    return(
      <FadeTransform
        in
        transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
        <Card>
            <CardImg top src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText className="text-justify">{dish.description}</CardText>
            </CardBody>
        </Card>
      </FadeTransform>
    );
  else
    return(
        <div></div>
    );
}
function RenderComments({comments, postComment, dishId})
{
  if(comments!=null){
    var commentList = comments.map(comment => {
      return (
        <Fade in>
        <ul key={comment.id} className="list-unstyled">
          <li>{comment.comment}</li>
          <br/>
          <li>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
        </ul>
        </Fade>
      );
    });

    return(
      <Card>
        <CardTitle>
          <h4>Comments</h4>
        </CardTitle>
        <CardBody>
            <CardText><Stagger in>{commentList}</Stagger></CardText>
            <CommentForm dishId={dishId} postComment={postComment} />
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
        else if (props.dish != null)
          return (
            <div className="container">
              <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                  <RenderComments comments={props.comments}
                     postComment={props.postComment}
                     dishId={props.dish.id}
                   />
                </div>
              </div>
            </div>
          );
}
export default Dishdetail;

const required = (val) => val && val.length;
const maxLength =(len) => (val) => !val || (len>=val.length);
const minLength = (len) => (val) => !val || (len<=val.length);

export class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state={
      isModalOpen:false,
      author:'',
      comment:'',
      rating:'',
      message:'',
      touched:{
        author:false
      }

    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit(values){
    this.toggleModal();
    this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
  }

  render(){
    return(
      <div>
        <Button type="submit" onClick={this.toggleModal}><span class="fa fa-pencil fa-lg" />Submit Comment</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row>
                <Label xs={12} htmlFor="Rating">Rating</Label>
                <Col xs={12}>
                    <Control.select model=".rating" name="contactType"
                        className="form-control">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Control.select>
                </Col>
              </Row>
              <Row>
                <Label xs={12} htmlFor="author">Your Name</Label>
                <Col xs={12}>
                  <Control.text model=".author" id="author" name="author"
                      placeholder="Your Name"
                      className="form-control"
                      validators={{
                         required, minLength: minLength(2), maxLength: maxLength(15)
                      }}
                       />
                  <Errors
                      className="text-danger"
                      model=".author"
                      show="touched"
                      messages={{
                          required: 'Required',
                          minLength: 'Must be greater than 2 numbers',
                          maxLength: 'Must be 15 numbers or less'
                      }}
                      />
                </Col>
              </Row>
              <Row>
              <Label xs={12} htmlFor="comment">Comment</Label>
                <Col xs={12}>
                  <Control.textarea xs={12} model=".comment" id="comment" Name="comment"
                      rows="6" className="form-control"/>
                </Col>
                <Col >
                <Button type="Submit" color="primary">Submit</Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
