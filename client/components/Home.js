import React from "react";
import { useSelector } from "react-redux";
// import {connect} from 'react-redux'

const Home = () => {
  // const {username} = props

  const username = useSelector((state) => state.auth.username);

  return (
    <div>
      <h3>Welcome, {username}</h3>
    </div>
  );
};

// const mapState = state => {
//   return {
//     username: state.auth.username
//   }
// }

// export default connect(mapState)(Home)
export default Home;
