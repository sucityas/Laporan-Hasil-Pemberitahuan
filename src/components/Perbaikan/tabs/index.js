import React, {
  useRef,
  useState,
  forwardRef,
  useCallback,
  Suspense,
  useEffect,
  createRef,
  useImperativeHandle,
} from "react";
import Tabs from "antd/lib/tabs";
import Title from "./title";
import Footer from "./footer";

const { TabPane } = Tabs;

const ChildrenCustom = forwardRef(({ children, onStatus }, ref) => {
  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      ref: ref,
      onStatus: (e) => onStatus(e),
    });
  }
});

function Body({ tabs = [] }) {
  const [refChild] = useState(
    Array(tabs.length)
      .fill()
      .map((_) => createRef())
  );
  const [page, setPage] = useState("0");
  const [, updateState] = React.useState();
  const [status, setStatus] = useState(
    Array(tabs.length)
      .fill()
      .map((_) => ({ loading: false, error: false }))
  );

  const tabHandler = useCallback((e) => {
    // console.log('refChild', {refChild})
    // refChild.current.getBoundingClientRect()
    switch (e) {
      case "prev":
        setPage((prev) => {
          // refChild.current.sendHandler(prev)
          refChild[Number(prev)].current.sendHandler(Number(prev));
          const pg = Number(prev);
          const res = pg === 0 ? 0 : pg - 1;
          // console.log(res);
          return String(res);
        });
        break;
      case "next":
        setPage((prev) => {
          // refChild.crefChildurrent.sendHandler(prev)
          refChild[Number(prev)].current.sendHandler(Number(prev));
          const pg = Number(prev);
          const max = tabs.length - 1;
          const res = pg === max ? max : pg + 1;
          // console.log(res);
          return String(res);
        });
        break;
      default:
        setPage((prev) => {
          refChild[Number(prev)].current.sendHandler(Number(prev));
          return e;
        });
        break;
    }
  }, []);

  const forceUpdate = React.useCallback(() => updateState({}), []);

  function statusHandler(e, i) {
    let temp = status;
    temp[i] = e;
    // console.log('statusHandler', {e,i,temp});
    setStatus((prev) => temp);
    forceUpdate();
  }

  return (
    <Tabs onChange={(e) => tabHandler(e)} activeKey={page}>
      {tabs.map((e, i) => {
        const max = tabs.length - 1;
        return (
          <TabPane
            tab={
              <Title
                title={e.title}
                loading={status[i].loading}
                error={status[i].error}
              />
            }
            key={i}
            forceRender={true}
          >
            <ChildrenCustom
              ref={refChild[i]}
              onStatus={(e) => statusHandler(e, i)}
              keys={i}
              title={e.title}
              last={i === max}
              onClick={(e) => tabHandler(e)}
            >
              {e.children}
            </ChildrenCustom>
            <Footer
              key={`ft${i}`}
              first={i === 0}
              last={i === max}
              onClick={(e) => {
                tabHandler(e.target.name);
              }}
            />
          </TabPane>
        );
      })}
    </Tabs>
  );
}

export default Body;
