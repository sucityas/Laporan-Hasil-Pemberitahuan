import React, { useRef } from "react";
import TabTitle from "./title";
import Footer from "./footer";
import { Tabs } from "antd";

const { Tabpane } = Tabs;

function tabPaneCustom({
  key,
  title,
  last,
  status,
  children,
  next = () => {},
  prev = () => {},
}) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const refChild = useRef();

  function clickHandle(e) {
    switch (e) {
      case "next":
        next();
        break;
      case "prev":
        prev();
        break;
      default:
        break;
    }
    refChild.current.save();
  }

  function ChildrenCustom() {
    const ChildrenWithProps = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        const props = { ref: refChild };
        return React.cloneElement(child, props);
      }
      return child;
    });
    return ChildrenWithProps;
  }

  return (
    <Tabpane
      forceRender={true}
      tab={<TabTitle title={title} key={key} status={status} />}
      key={key}
    >
      <ChildrenCustom />
      <Footer
        id={key}
        onClick={clickHandle}
        first={key === 0}
        last={key === last}
      />
    </Tabpane>
  );
}

export default tabPaneCustom;
