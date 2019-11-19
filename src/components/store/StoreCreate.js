import React, { Component } from 'react';
import { connect } from 'react-redux';
import { storeCreate } from '../../actions';
import { Card, CardSection, Button } from '../common';
import StoreForm from '../store/StoreForm';

class StoreCreate extends Component {
  
  onButtonPress() {
    const { name, description, image } = this.props;
    this.props.storeCreate({ name, description, image });
    this.props.onButtonPress();
  }

  render() {
    return (
      <Card>
        <StoreForm {...this.props}/>
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Create
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, description, image } = state.storeForm;
  return { name, description, image };
}

export default connect(mapStateToProps, {storeCreate})(StoreCreate);
