import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { Row, Col, Typography, Statistic, Card, Button } from "antd";
const { Title } = Typography;

function InfoCard() {
  return (
    <Row>
      <Col
        xs={{ span: 20, offset: 2 }}
        md={{ span: 8, offset: 8 }}
        lg={{ span: 6, offset: 9 }}
      >
        <div style={{ marginTop: "50px" }}>
          <Title level={4}>Mailcheck bundle info</Title>
          <div className="site-statistic-demo-card">
            <Row gutter={16}>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="BUNDLE SIZE"
                    value={3.5}
                    precision={2}
                    valueStyle={{ color: "rgba(0,0,0,.85)" }}
                    prefix={<ArrowDownOutlined />}
                    suffix="kb"
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="BUNDLE MINIFIED"
                    value={1.4}
                    precision={2}
                    valueStyle={{ color: "rgba(0,0,0,.85)" }}
                    prefix={<ArrowUpOutlined />}
                    suffix="kb"
                  />
                </Card>
              </Col>
            </Row>
          </div>
        </div>
        <Button
          href="https://github.com/mailcheck/mailcheck"
          style={{ paddingLeft: "0px" }}
          type="link"
        >
          Mailcheck GitHub
        </Button>
      </Col>
    </Row>
  );
}

export default InfoCard;
