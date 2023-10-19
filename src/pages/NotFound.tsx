import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function NotFoundDemo() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 20,
        fontWeight: "bold",
        paddingBottom: 100,
        flexDirection: "column",
      }}
    >
      <span style={{ padding: "20px 10px" }}>Page not found！</span>
      <Button
        type="primary"
        onClick={() => {
          navigate("/", {
            replace: true,
          });
        }}
        style={{ marginBottom: 100 }}
      >
        Go Back
      </Button>
    </div>
  );
}

export default NotFoundDemo;
