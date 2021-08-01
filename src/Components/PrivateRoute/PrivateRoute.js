import { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../UserContext/UserContext.js";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isLogedIn } = useContext(UserContext);
    useEffect(() => {
        console.log({ isLogedIn });
    })
    return (
        <Route
            {...rest}
            render={
                props => isLogedIn ?
                    <Component {...props} /> :
                    <Redirect to='/' />
            }
        />
    );
}

export default PrivateRoute;