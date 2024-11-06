import React from "react";
import { Link } from "react-router-dom";

export default function SampleRoutingMenu({ pathName }) {
  return (
    <>
      <h5>Sample Menu</h5>
      <nav className="navbar navbar">
        <ul className="nav navbar-nav">
          <li>
            <Link to={`${pathName}`}>Homes</Link>
          </li>
          <li>
            <Link to={`${pathName}/category`}>Category</Link>
          </li>
          <li>
            <Link to={`${pathName}/products`}>Products</Link>
          </li>
          <li>
            <Link to={`${pathName}/admin`}>Admin area</Link>
          </li>
          <li>
            <Link to={`${pathName}/profile`}>Profile</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
