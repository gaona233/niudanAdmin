import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LayOutComp from "pages/main/App";
import { router } from "config/path";
import { Provider } from 'mobx-react';
import * as store from 'store';
import { createBrowserHistory } from "history";
const history = createBrowserHistory();
export default class PageRouter extends React.Component<any, any> {
    render() {
        return (
            <Provider {...store} >
                <Router>
                    <Switch >
                        <LayOutComp>
                            {router.map(res => (
                                <Route key={res.path} path={res.path} render={(props: any) => <res.conponemt {...props} />} />
                            ))}
                        </LayOutComp>
                    </Switch>
                </Router>
            </Provider >
        );
    }
}