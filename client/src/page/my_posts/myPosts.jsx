import React from "react";
import Navbar from "../../component/nav_bar/navbar";
import styles from "./myPosts.module.css";

const MyPosts = (props) => (
  <>
    <Navbar showRegisterButton={true}></Navbar>
    <section className={styles.pageWrapper}>
      <div className={styles.test}>hi I'm my post page</div>
    </section>
  </>
);

export default MyPosts;
