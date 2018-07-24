// higher order component

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
      <h1>Info</h1>
      <p>{props.info}</p>
    </div>  
);

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            { props.isAdmin && <p>This is private info. Pls don't share.</p>}
            <WrappedComponent {...props} />
        </div>
    );
};

const AdminInfo = withAdminWarning(Info);

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
      <div>
         { props.isAuthentificated ? 
            (<WrappedComponent {...props} />) :
            (<p>Pls log in</p>) }
      </div>
    );
};

const AuthInfo = requireAuthentication(Info);

/*ReactDOM.render(
    <AdminInfo isAdmin={true} info="These are the details" />,
    document.getElementById('app')
);*/

ReactDOM.render(
    <AuthInfo isAuthentificated={false} info="This is your page" />,
    document.getElementById('app')
);