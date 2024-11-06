import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import MainApp from './containers/App';
import { notification, Spin } from 'antd';
import { v4 } from "uuid"
import PemeriksaanBarang from "./pages/barangpenumpang/lhp/Lhp"
import BrowseHasilLhp from "./pages/barangpenumpang/lhpHasilPerekaman/index.jsx"
import BrowsePemeriksaanBarang from './pages/barangpenumpang/lhp/index.jsx';
import HasilPemeriksaanBarang from './pages/barangpenumpang/lhpHasilPerekaman/Lhp';
import { persistor, store } from './appRedux/store';
import { PersistGate } from 'redux-persist/integration/react';

const MainRoute = () => {
  return (
    <>
      <Switch>
        {/* <Route path="/404" component={Page404} /> */}
        <Route exact path="/" component={BrowsePemeriksaanBarang} />
        <Route path="/barang-penumpang/lhp" component={BrowsePemeriksaanBarang} />
        <Route path="/barang-penumpang/lhp-perekaman" component={PemeriksaanBarang} />
        <Route path="/barang-penumpang/lhp-hasil" component={BrowseHasilLhp} />
        <Route path="/barang-penumpang/lhp-hasil-periksa" component={HasilPemeriksaanBarang} />
        {/* <Route path="/portal" render={(props) => <Suspense
          fallback={(
            <div style={{
              display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',
            }}
            >
              <Spin size="large" />
            </div>
          )}
        >
          <LoginCustom {...props} isLogin={isLogin} />
        </Suspense>
        } /> */}
      </Switch>
    </>
  );
};

export default function Main() {
  return (
    // <Router>
    //       <MainRoute />
    //     </Router>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <MainRoute />
        </Router>
      </PersistGate>
    </Provider>
    )
}

