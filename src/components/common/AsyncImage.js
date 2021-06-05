import React, { Component } from 'react';
import { Image } from 'react-native';
import { Spinner } from './Spinner';
import firebase from 'firebase';

class AsyncImage extends Component {
  
  _isMounted = false;
  
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      image: null,
      uri: null,
      imageRoute: ""
    }
  }

  componentDidMount() {
    this._isMounted = true;
    if (this.props.uri) {
      this.setState({ uri: this.props.uri, loading: false });
    } else {
      if (this.props.image) {
        this.setState({ image: this.props.image, loading: false });
      } else {
        if (this.props.imageRoute) {
          this.getAndLoadHttpUrl();
        } else {
          this.setState({loading: false});
        }
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.props.uri) {
      if (this.props.imageRoute != prevProps.imageRoute) {
        this.getAndLoadHttpUrl();
      }
    }
    if (this.props.uri !== prevProps.uri) {
      this.setState({ uri: this.props.uri, loading: false });
    }
    if (this.props.image !== prevProps.image) {
      this.setState({ image: this.props.image, loading: false });
    }
  }

  
  getAndLoadHttpUrl() {
    this.setState({ loading: true });
    const ref = firebase.storage().ref(this.props.imageRoute);
    ref.getDownloadURL().then(data => {
      if (this._isMounted) {
        this.setState({ url: data, loading: false });
      }
    }).catch(error => {
      console.log("AsyncImage > getAndLoadHttpUrl", error);
      this.setState({ uri: null, loading: false });
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (this.state.loading) {
      return <Spinner size="large"/>;
    }
    const image = this.state.uri ? { uri: this.state.uri } : this.state.image;
    return <Image style={this.props.style} source={image} />;
  }
}

export { AsyncImage };
