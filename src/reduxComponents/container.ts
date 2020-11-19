import { App as Component } from '../app';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Dispatch } from 'react';


const mapStateToProps = (state: any) => {
  return {
    //state boys with props goes here 
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    //dispatch props go hereeeee
  }
}


export const App = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
         )
           )(Component);

