import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LayOutComp from "pages/main/App";
import { router } from "config/path";
import { Provider } from 'mobx-react';
export default class PageRouter extends React.Component<any> {
    render() {
        return (
            <Provider>
                <Router>
                    <LayOutComp>
                        {router.map(res => (
                            <Route key={res.path} path={res.path} component={res.conponemt} />
                        ))}
                    </LayOutComp>
                </Router>
            </Provider>
        );
    }
}