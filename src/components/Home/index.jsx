import React from "react";
import axios from "axios";
import moment from "moment";
import { connect } from "react-redux";
import bg from "../../assets/bg.jpg";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Content = styled.div`
  h2{
    letter-spacing:.1rem;
  }
  width:100vw;
  height:100vh;
  background: cover ;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  aside {
    div:first-of-type {
      background-color: rgba(25, 21, 25, 0.9) !important;
      width: 100%;
      background-color: white;
      border-radius: 2%;
    
    }
    div{
      cursor:pointer;
      p svg{
        height:3rem
      }
    }
  }
  
`;

const Bg = styled.div`
position:fixed;
top:0;
left:0;
background-image: url(${bg});
width:100vw;
height:100%;
`

const Card = styled.div`
  background-image: url("https://source.unsplash.com/category/nature/400x260");
  .card-overlay {
    background-color: rgba(55, 21, 35, 0.5);
    height: 100%;
    width: 100%;
    cursor: pointer;
  }
  * {
    text-decoration:none !important;
  }
  &:hover{
    .card-overlay {
      background-color: rgba(55, 21, 35, 0.3);
      height: 100%;
      width: 100%;
      cursor: pointer;
    }
  }
`;


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    const { onLoad } = this.props;

    axios("https://shark-blog-one.herokuapp.com/api/articles").then(res =>
      onLoad(res.data)
    );
  }

  handleDelete(id) {
    const { onDelete } = this.props;

    return axios
      .delete(`https://shark-blog-one.herokuapp.com/api/articles/${id}`)
      .then(() => onDelete(id));
  }

  handleEdit(article) {
    const { setEdit } = this.props;

    setEdit(article);
  }

  render() {
    const { articles } = this.props;

    return (
      <Content className="">
        <Bg img={bg}/>
        <div className="container">
          <div className="row pt-5">
            <div className="col-12 offset-lg-1 text-light mb-5">
              <h1 className="text-center">JOMO</h1>
              <h2 className="text-center ">Technology / Startups / Webdev </h2>
            </div>
          </div>
          <div className="row d-flex">
            <div className="col-12 col-lg-9 p-0">
              <div className="row pl-lg-5 ml-lg-5">
                {articles.map((article, index) => {
                  return (
                    <Card
                      className={
                        index === 0
                          ? "card p-0  offset-1 offset-lg-0 col-10 col-lg-6 ml-lg-4 mb-4"
                          : "card p-0 offset-1 offset-lg-0 col-10  col-lg-3 ml-lg-4 mb-4"
                      }
                      key={`article-${article._id}`}
                      bg={article.img ? article.img : ""}
                    >
                     <Link
                    to={`/post/${article._id}`}
                    article = {article}
                    >
                      <div className="card-overlay">
                        <div className="card-header text-light">
                          {article.title}
                        </div>
                        <div className="card-body text-light">
                          {article.body}
                          <p className="mt-5 text-light ">
                            <b>{article.author}</b>{" "}
                            {moment(new Date(article.createdAt)).fromNow()}
                          </p>
                        </div>
                        <div className="card-footer">
                          <div className="row" />
                        </div>
                      </div>
                     </Link>
                    </Card>
                  );
                })}
              </div>
            </div>
            <div className="col-12 p-3 p-lg-0 col-lg-3">
              <aside>
                <div className="mb-4 text-light">
                  <h2 className="text-center  p-3">Quote</h2>
                  <p className="font-italic  p-3">"The first step is to establish that something is possible; then probability will occur."</p>
                  <p className="font-italic  p-3">Elon Musk</p>
                </div>
                <div className="text-light">
                  <p className="d-flex align-items-center p-3">
                    <svg
                      version="1.1"
                      id="Layer_1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="white"
                        d="M211.9 197.4h-36.7v59.9h36.7V433.1h70.5V256.5h49.2l5.2-59.1h-54.4c0 0 0-22.1 0-33.7 0-13.9 2.8-19.5 16.3-19.5 10.9 0 38.2 0 38.2 0V82.9c0 0-40.2 0-48.8 0 -52.5 0-76.1 23.1-76.1 67.3C211.9 188.8 211.9 197.4 211.9 197.4z"
                      />
                    </svg>
                    Go to facebook
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </div>
   
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.home.articles
});

const mapDispatchToProps = dispatch => ({
  onLoad: data => dispatch({ type: "HOME_PAGE_LOADED", data }),
  onDelete: id => dispatch({ type: "DELETE_ARTICLE", id }),
  setEdit: article => dispatch({ type: "SET_EDIT", article })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
