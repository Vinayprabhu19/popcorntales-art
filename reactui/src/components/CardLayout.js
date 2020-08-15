import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import LazyLoad from 'react-lazy-load';
class CardLayout extends Component {
  constructor(props){
    super(props);
    this.props.originalImage=props.design.image;
    this.processImageData = this.processImageData.bind(this);
    props.design.image = this.processImageData(props.design.image);
  }
  shouldComponentUpdate(nextProps, nextState){
    if(this.props.design.title == nextProps.design.title)
    return false;
    return true;
  }
  render() {
    return <a href={this.props.originalImage} target="_blank">
              <LazyLoad>
              <img className="card-image" alt={"Popcorn Tales - " + this.props.design.title } src={this.props.design.image}/>
              </LazyLoad>
        </a>
  }
  processImageData(image){
    var width,height;
    var width,height;
    // if(window.matchMedia("(max-width: 576px)").matches){
    //   width=150;height=188;
    // }
    // else if(window.matchMedia("(max-width: 958px)").matches){
    //   width=200;height=250;
    // }
    // else if(window.matchMedia("(max-width: 1300px)").matches){
    //   width=220;height=275;
    // }
    // else if(window.matchMedia("(max-width: 2000px)").matches){
    //   width=300;height=375;
    // }
    // else{
    //   width=400;height=500;
    // }
    width=400;
    height=500;
    return image+"&width="+width+"&height="+height;

  }
}

export default CardLayout;