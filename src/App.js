import React, { useState } from "react";
import "antd/dist/antd.css";
import "./App.css";
import {
  SearchOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  CheckOutlined,
  CloseOutlined,
  MailOutlined,
} from "@ant-design/icons";
import {
  Input,
  Row,
  Col,
  Button,
  Form,
  Typography,
  PageHeader,
  Statistic,
  Card,
} from "antd";
import {
  defaultDomains,
  defaultTopLevelDomains,
  defaultSecondLevelDomains,
} from "./emailDomains";
import InfoCard from "./infoCard";
const { Text, Title } = Typography;
var mailcheck = require("mailcheck");

function App() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [suggestion, setSuggestion] = useState(null);
  const [checking, setChecking] = useState(false);
  const [info, setInfo] = useState(null);
  const [emailLooksValid, setValidEmail] = useState(false);

  function onSubmit() {
    if (email === "") {
      if (error !== "") {
        setError("Stop that!");
      } else {
        setError("Please enter an email");
      }

      return;
    }

    setChecking(true);
    mailcheck.run({
      email: email,
      domains: defaultDomains, // optional
      topLevelDomains: defaultTopLevelDomains, // optional
      secondLevelDomains: defaultSecondLevelDomains, // optional
      suggested: function (suggestion) {
        // callback code
        console.log(suggestion, "x");
        setChecking(false);
        if (suggestion) {
          setSuggestion(suggestion);
        }
      },
      empty: function (x) {
        setError("No suggestion for this email");
        setChecking(false);
        setInfo("What does this mean?");
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        setValidEmail(regex.test(email));
      },
    });
  }
  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Email"
        subTitle="checker"
      />
      <div className="App">
        <Row>
          <Col
            xs={{ span: 20, offset: 2 }}
            md={{ span: 8, offset: 8 }}
            lg={{ span: 6, offset: 9 }}
          >
            <Title style={{ marginBottom: "10px" }} level={2}>
              EmailCheck <MailOutlined />
            </Title>
            <span style={{ marginBottom: "10px" }}>Enter an email</span>
            <Form>
              <Input
                autoComplete
                allowClear
                onPressEnter={onSubmit}
                disabled={checking}
                placeholder="Enter an email to check"
                onChange={(val) => {
                  if (error !== "") {
                    setError("");
                  }
                  setSuggestion(null);
                  setEmail(val.currentTarget.value);
                }}
                value={email}
              />
              {suggestion ? (
                <>
                  <span>Did you mean</span>
                  <Button
                    type="link"
                    onClick={() => {
                      setEmail(suggestion.full);
                      setSuggestion(null);
                    }}
                  >
                    {suggestion.full}
                  </Button>
                </>
              ) : null}

              {error !== "" ? <Text type="danger">{error}</Text> : null}
              {info !== null && email !== "" && error !== "" ? (
                <>
                  <br />
                  <span>
                    Your email looks
                    {emailLooksValid ? <CheckOutlined /> : <CloseOutlined />}
                  </span>
                </>
              ) : null}

              <Button
                disabled={checking}
                onClick={onSubmit}
                style={{ marginTop: "25px", width: "100%" }}
                type={email.length > 0 ? "primary" : "default"}
                icon={<SearchOutlined />}
              >
                Check email
              </Button>
            </Form>
          </Col>
        </Row>
        <InfoCard />
      </div>
    </>
  );
}

export default App;
