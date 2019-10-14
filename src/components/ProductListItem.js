import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback, Image } from 'react-native';
import { CardSection, Spinner } from './common';
import { imagesFetch } from '../actions';
import { connect } from 'react-redux';

class ProductListItem extends Component {
  
  componentWillMount() {
    const {imageName} = this.props.product;
    const uri = imageName ? `images/${imageName}` : 'regalo.jpg';
    this.props.imagesFetch(uri);
  }

  onRowPress() {
    console.log("press button");
  }

  renderImage = () => {
    console.log("this.props", this.props.image);
    if(!this.props.loading) {
      return <Spinner size="large"/>;
    }
    return (
      <Image
        style={{width: 50, height: 50}}
        source={{uri: this.props.image}}
      />
    );
  }

  render() {
    const {name, description, price} = this.props.product;
    return(
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>
              {name}
            </Text>
            <Text style={styles.titleStyle}>
              {description}
            </Text>
            <Text style={styles.titleStyle}>
              {price}
            </Text>
            {this.renderImage()}
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

const mapStateToProps = ({imageLoader}) => {
  const {image, loading} = imageLoader;
  return {image, loading};
};

export default connect(mapStateToProps, {imagesFetch})(ProductListItem);
