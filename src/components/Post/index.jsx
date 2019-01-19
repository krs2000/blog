import React from "react";
import axios from "axios";
import moment from "moment";
import { connect } from "react-redux";
import bg from "../../assets/bg.jpg";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Content = styled.div`
  background-image: url(${bg});
  height: 100vh;
  width: 100vw;
  background: cover;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .bg {
    width: 90vw;
    background: rgb(255, 255, 255, 0.9);
    height: 100%;
  }
`;

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: ""
    };
  }

  componentDidMount() {
    const { onLoad } = this.props;
    let id = this.props.location.pathname.replace("/post/", "");
    axios(`https://shark-blog-one.herokuapp.com/api/articles/${id}`).then(res =>
      this.setState({ article: res.data.article })
    );
  }

  render() {
    const { article } = this.state;
    return (
      <Content img={bg} className="d-flex justify-content-center">
        <div className="bg">
          <h1 className="p-3 text-center">{article.title}</h1>
          <article className="p-3">{article.body}</article>
          <Link className="p-3" to={`/`}>Back</Link>
        </div>
      </Content>
    );
  }
}

export default Post;
