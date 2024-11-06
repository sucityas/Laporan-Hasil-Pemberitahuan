import React from "react";
import { Affix, Button, Row, Col, Card } from "antd";

const Footer = ({ onClick = () => {}, first, last, id }) => {
  // console.log("render footer tab");
  return (
    <Affix offsetBottom={10}>
      <Card
        style={{
          height: 50,
          boxShadow: "0px 0px 1px 1px #ADD8E6",
        }}
      >
        <Row guttr={10} style={{ top: -17 }}>
          <Col span={12}>
            {first ? null : (
              <Button
                id={id}
                name="prev"
                type="primary"
                icon="left-circle"
                onClick={onClick}
                // onClick={(e) => {
                //     console.log({e});
                //     // this.props.setPage(String(Number(page)-1))
                // }}
              >
                Sebelumnya
              </Button>
            )}
          </Col>
          <Col span={12} align="right">
            {last ? null : (
              <Button
                id={id}
                name="next"
                type="primary"
                icon="right-circle"
                onClick={onClick}
                // onClick={(e) => {
                //     console.log({name: e.target.name});
                //     this.props.setPage(String(Number(page)+1))
                // }}
              >
                Selanjutnya
              </Button>
            )}
          </Col>
        </Row>
      </Card>
    </Affix>
  );
};

export default React.memo(Footer, (prev, next) => prev.key === next.key);
