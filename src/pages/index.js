import React, { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
// import hostMicroFrontend from "./microfrontend.json";
import { Route, Switch } from "react-router-dom";
import LoadingWrapperSkelton from "../components/LoadingWrapperSkeleton";
import BarangPenumpang from './routes/barangPenumpang'

const Pages = (props) => {
  const refreshToken = useSelector((state) => state.rkc);
  const { url: mUrl } = props.match
  const checkPath = () => {
    const path = window.location.pathname,
      menu = props.menu || [];
    // eslint-disable-next-line array-callback-return
    const canAccessModule = menu.map((data) => {
      if ((data.url || '').indexOf("*") >= 0) {
        const splitMenu = data.url.split("*")[0];
        return (
          (path.includes(splitMenu) && path.split(splitMenu)[0] === "") ||
          data.url === path
        );
      }
    });
    return canAccessModule;
  };

  const routes = [
    ...BarangPenumpang,
  ]
  if (checkPath())
    return (
      <Suspense fallback={<LoadingWrapperSkelton />}>
        <Switch>
          {routes.map(item => <Route key={item.path} {...item} />)}

        </Switch>

      </Suspense>
    );
  else
    return (
      <div style={{ width: "100%", textAlign: "center" }}> PAGE NOT FOUND</div>
    );
};

export default Pages;
