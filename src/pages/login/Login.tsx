import { FC, useState } from "react";
import img from "../../assets/najot.png";
import logo from "../../assets/logo.png";
import type { FormProps } from "antd";
import { Button, Form, Input, message } from "antd";
import "./login.scss";
import { useSignInMutation } from "../../context/api/userApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../context/slices/authSlice";

type FieldType = {
  login: string;
  password: string;
};

const Login: FC = () => {
  const [login] = useSignInMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true);
    try {
      const response = await login(values).unwrap();
      dispatch(setToken(response.data.accessToken));
      message.success("Login successful!");
      navigate("/contract");
    } catch (err) {
      message.error("Login failed. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <div className="login">
      <div className="login__left">
        <img src={img} alt="Background" />
      </div>
      <div className="login__right">
        <div className="login__right__top-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="login__right__bottom">
          <h3 className="login__right__title">Tizimga kirish</h3>
          <Form<FieldType>
            name="basic"
            layout="vertical"
            labelCol={{ span: 32 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ login: "superadmin", password: "12345" }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Login"
              name="login"
              rules={[{ required: true, message: "Please input your username!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Parol"
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item label={null}>
              <Button
                style={{
                  width: "100%",
                  backgroundColor: "#0EB182",
                  color: "#fff",
                  border: "none",
                }}
                htmlType="submit"
                disabled={loading}
              >
                {loading ? "Loading..." : "Submit"}
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Login;
