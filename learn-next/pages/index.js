import Layout, { siteTitle } from "../components/Layout";
import utilStyles from "./utils.module.css";
import Head from "next/head";

function Home() {
  return (
    <Layout home>
      <section className={utilStyles.headingMd}>
        <p>
          Hi, I'm Shaurya Singhal. Learning Next, GraphQL, Apollo @ the same
          time. (3 Days already Past!)
        </p>
      </section>
    </Layout>
  );
}

export default Home;
