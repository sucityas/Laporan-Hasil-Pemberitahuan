import React, {
  useRef,
  useState,
  forwardRef,
  useCallback,
  createRef,
  memo,
  useMemo,
  useImperativeHandle,
} from "react";
import Tabs from "antd/lib/tabs";
import Title from "./title";
import Footer from "./footer";
import { Card } from "antd";
import { compact } from "lodash";
import { checkTab } from "utils/perbaikan-module/validator";

const { TabPane } = Tabs;

const ChildrenCustom = forwardRef(
  ({ children, onStatus, onReload, onFooter, data }, ref) => {
    if (React.isValidElement(children)) {
      return React.cloneElement(children, {
        ref: ref,
        onStatus: (e) => onStatus(e),
        onFooter: (e) => onFooter(),
        onReload: (e) => onReload(e),
        data: data,
      });
    }
  }
);

const Body = forwardRef(
  ({ tabs = [], data = {}, redirect = "0", onStatus = () => {} }, ref) => {
    const kodeDokumen = data.kodeDokumen || "";
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const tabRender = useMemo(
      () => compact(tabs.map((e) => (checkTab(kodeDokumen, e.tab) ? e : null))),
      [tabs]
    );

    const refFooter = useRef(true);
    const [refChild] = useState(
      Array(tabRender.length)
        .fill()
        .map((_) => createRef())
    );
    const [page, setPage] = useState(redirect);
    const [, updateState] = React.useState();
    const [status, setStatus] = useState(
      Array(tabRender.length)
        .fill()
        .map((_) => ({ loading: false, error: false }))
    );

    useImperativeHandle(
      ref,
      () => ({
        sendHandler: (index = 0) => {
          refChild[Number(index)].current.sendHandler(index);
        },
      }),
      [refChild]
    );

    const tabHandler = useCallback(
      (e) => {
        switch (e) {
          case "prev":
            setPage((prev) => {
              refChild[Number(prev)].current.sendHandler(Number(prev), e);
              const pg = Number(prev);
              const res = pg === 0 ? 0 : pg - 1;
              return String(res);
            });
            break;
          case "next":
            setPage((prev) => {
              refChild[Number(prev)].current.sendHandler(Number(prev), e);
              const pg = Number(prev);
              const max = tabRender.length - 1;
              const res = pg === max ? max : pg + 1;

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
      },
      [setPage, tabRender, refChild]
    );

    const forceUpdate = React.useCallback(() => updateState({}), []);

    function statusHandler(e, i) {
      let temp = status;
      temp[i] = e;

      onStatus(temp);
      setStatus((prev) => temp);
      forceUpdate();
    }

    // console.log('render tab', {tabRender, data});
    return (
      <Tabs onChange={(e) => tabHandler(e)} activeKey={page} animated={false}>
        {tabRender.map(({ title, children, tab = "" }, i) => {
          const max = tabRender.length - 1;
          return (
            <TabPane
              tab={
                <Title
                  title={title}
                  loading={status[i].loading}
                  error={status[i].error}
                  index={i}
                />
              }
              // disabled={status[i].loading}
              key={i}
              forceRender={true}
            >
              <Card>
                <ChildrenCustom
                  ref={refChild[i]}
                  onStatus={(e) => statusHandler(e, i)}
                  onReload={(e) =>
                    refChild[Number(e)]?.current?.reload(Number(e))
                  }
                  keys={i}
                  title={title}
                  last={i === max}
                  onClick={(e) => tabHandler(e)}
                  onFooter={(e) => {
                    refFooter.current = e;
                  }}
                  data={data}
                >
                  {children}
                </ChildrenCustom>
              </Card>
              <Footer
                key={`ft${i || ""}`}
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
);

export default memo(Body);
