import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LayOutComp from "pages/main/App";
import { router } from "config/path";
import { Provider } from 'mobx-react';
import * as store from '../store';
export default class PageRouter extends React.Component<any> {
    render() {
        return (
            <Provider {...store}>
                <Router>
                    <Switch>
                        <LayOutComp>
                            {router.map(res => (
                                <Route key={res.path} path={res.path} component={res.conponemt} />
                            ))}
                        </LayOutComp>
                    </Switch>
                </Router>
            </Provider>
        );
    }
}