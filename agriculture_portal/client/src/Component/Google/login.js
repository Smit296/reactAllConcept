
import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Action from "../../ActionCreater/user";

const { google } = Action;


class Google extends Component {
  constructor() {
    super();
    this.state = { isAuthenticated: false, user: null, token: '' };
    this.googleResponse = this.googleResponse;
  }

  googleResponse = (response) => {
    const { googleId, imageUrl, email, name } = response.profileObj;
    this.props.google({
      googleId, email, name, img: imageUrl
    })
    // console.log(tokenBlob)
    // const options = {
    //   method: 'POST',
    //   body: tokenBlob,
    //   mode: 'cors',
    //   cache: 'default'
    // };
    // axios.post('http://localhost:5000/oauth/api', options).then(user => {
    //   console.log(user)
    // })
  };

  onFailure = (error) => {
    console.error(error);
  }

  render() {
    // let content = !!this.state.isAuthenticated ?
    //   (
    //     <div>
    //       <p>Authenticated</p>
    //       <div>
    //         {this.state.user.email}
    //       </div>
    //       <div>
    //         <button onClick={this.logout} className="button">
    //           Log out
    //         </button>
    //       </div>
    //     </div>
    //   ) :
    //   (
    //     <GoogleLogin
    //       clientId="829821026200-pu1d85t4lfc8m8qohpqakgdvhe9595fi.apps.googleusercontent.com"
    //       buttonText="Login"
    //       onSuccess={this.googleResponse}
    //       onFailure={this.onFailure}
    //     />
    // );

    return (
      <>
        <GoogleLogin
          clientId="829821026200-pu1d85t4lfc8m8qohpqakgdvhe9595fi.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.googleResponse}
          onFailure={this.onFailure}
        />
      </>
    );
  }
}

const take = (state) => {
  return state;
};

const change = (dispatch) => {
  return bindActionCreators({ google }, dispatch);
};

export default connect(take, change)(Google);