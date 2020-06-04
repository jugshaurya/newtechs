import Layout from "../components/Layout";
import classnames from "classnames";
import styles from "./alert.module.css";

const Alert = () => {
  const type = "error";
  return (
    <Layout>
      <div
        className={classnames({
          [styles.success]: type === "success",
          [styles.error]: type === "error",
        })}
      >
        Using Classnames; Oh Yeah!
      </div>
    </Layout>
  );
};

export default Alert;
