import React from "react";
import { Result, Button, Icon, Typography } from 'antd';
const { Paragraph, Text } = Typography;

export default function ErrorContent({messages = []}) {
  const errorMessage = []
  messages.forEach((item, i) => {
    errorMessage.push(<Paragraph key={i}>
      <Icon style={{ color: 'red' }} type="close-circle" />  {item}
    </Paragraph>)
  })
  return (
    <div className="kt-portlet kt-portlet--mobile">
      <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
        <Result
          status="error"
          title="Gagal memuat halaman"
          subTitle="Silahkan periksa jaringan anda atau coba beberapa saat lagi"
        >
          {messages.length > 0 ? (
            <div className="desc">
              <Paragraph>
                <Text
                  strong
                  style={{
                    fontSize: 16,
                  }}
                >
                  Konten yang Anda minta mengalami kesalahan berikut:
                </Text>
              </Paragraph>
              {errorMessage}
            </div>
          ) : null}
        </Result>
      </div>
    </div>
  )
}
