import React from 'react'
import { Route, Redirect } from 'react-router'
import { connect } from 'react-redux'

const AuthRoute = ({
  component: Component,
  Authenticated,
  ...rest
}) => (
    <Route
      {...rest}
      render={props =>
        Authenticated ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          )
      }
    />
  )
const take = (state) => {
  const { Authenticated } = state.user
  return {
    Authenticated
  };
}


export default connect(take)(AuthRoute)




// //HoC for check authentication
// import React, { Component } from 'react';
// import { connect } from 'react-redux';

// export default (ComposedComponent) => {
//   class RequireAuth extends Component {
//     componentWillMount() {
//       console.log('Uthentz Mount', this.props.Authenticated)
//       if (!this.props.Authenticated)
//         this.props.history.replace("/");
//     }
//     componentWillUpdate() {
//       console.log('Uthentz Outside', this.props.Authenticated)
//       if (!this.props.Authenticated) {
//         this.props.history.replace("/");
//       }
//     }
//     render() {
//       return (
//         <ComposedComponent {...this.props} />
//       )
//     }
//   }
//   const take = (state) => {
//     const { Authenticated } = state.user
//     return {
//       Authenticated
//     };
//   }
//   return connect(take)(RequireAuth);
// }