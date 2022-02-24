// import axios from 'axios';

let Action = {};

Action.notify = (data) => {
  return { type: "notify", payload: data };
};

export default Action;
