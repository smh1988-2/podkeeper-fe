// import React from 'react'
// // import { withRouter } from 'react-router-dom';
// import ReactGA from 'react-ga';

// import {
//     useLocation,
//     useNavigate,
//     useParams
//   } from "react-router-dom";
  
  
  
// const RouteChangeTracker = ({ history }) => {

//     function withRouter(RouteChangeTracker) {
//         function ComponentWithRouterProp(props) {
//           let location = useLocation();
//           let navigate = useNavigate();
//           let params = useParams();
//           return (
//             <Component
//               {...props}
//               router={{ location, navigate, params }}
//             />
//           );
//         }
      
//         return ComponentWithRouterProp;
//       }

//     history.listen((location, action) => {
//         ReactGA.set({ page: location.pathname });
//         ReactGA.pageview(location.pathname);
//     });

//     return <div></div>;
// };

// export default withRouter(RouteChangeTracker);
