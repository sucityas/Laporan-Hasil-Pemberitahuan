import React from "react";
import { Result, Button } from "antd";
import Container from "components/Perbaikan/Container";

const NotFound = ({ history }) => (
  <Container hideContentHeader>
    <Result
      status="warning"
      title="Halaman yang anda cari tidak ditemukan"
      extra={
        <Button ghost type="primary" key="console" onClick={history.goBack}>
          kembali
        </Button>
      }
    />
  </Container>
);
export default NotFound;
