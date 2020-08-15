import AppBar from '@material-ui/core/AppBar';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import MailIcon from '@material-ui/icons/Mail';
import SortIcon from '@material-ui/icons/Sort';
import React, { Suspense, lazy, Component } from 'react';
import '../css/Home.css';
import '../css/card.css';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Helmet } from 'react-helmet';
import BarChartIcon from '@material-ui/icons/BarChart';
import SocialMenu from './SocialMenu';
import { Container, Row, Col } from 'react-bootstrap';
import Tooltip from '@material-ui/core/Tooltip';
const CardsList = lazy(() => import('./CardsList'));
const Pagination = lazy(() => import('./Pagination'));
class Home extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!

    this.state = {
      designs: [],
      totalPages: 0,
      currentList: [],
      loading: true,
    };
    this.onPageChanged = this.onPageChanged.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log("Updating State");
    if (JSON.stringify(this.state) == JSON.stringify(nextState)) {
      return false;
    }
    return true;
  }
  componentDidMount() {
    var urlParams = new URLSearchParams(window.location.search);
    var pageNo = urlParams.get("page");
    fetch('https://api.popcorntales.com/design')
      .then(response => response.json())
      .then(result => {
        const rvs = result.map(item => {
          return item;
        });
        var currentPages = [];
        pageNo = (pageNo ==null)?1:parseInt(pageNo);
        var start = 6 * (pageNo - 1);
        var len = (result.length > 6 * (pageNo)) ? 6 * (pageNo) : result.length;
        for (var i = start; i < len; i++) {
          currentPages.push(result[i]);
        }
        this.setState({
          activePage: pageNo,
          totalPages: rvs.length,
          allDesigns: rvs,
          designs: rvs,
          currentList: currentPages,
          loading: false
        })
      })
      .catch(error => {
        console.error(error);
      })
  }

  onPageChanged(e) {
    var currentPages = [];
    var start = 6 * (e.currentPage - 1);
    var len = (this.state.designs.length > 6 * (e.currentPage)) ? 6 * (e.currentPage) : this.state.designs.length;
    for (var i = start; i < len; i++) {
      currentPages.push(this.state.designs[i]);
    }
    this.setState({
      currentList: currentPages
    });
    this.props.history.push("?page="+e.currentPage);;
  }

  onSearch(e) {

    var text = e.target.value;
    var designs = [];
    for (var i = 0; i < this.state.allDesigns.length; i++) {
      designs.push(this.state.allDesigns[i]);
    }

    designs = designs.filter(function (r) { return r.title.toLocaleLowerCase().includes(text.toLowerCase()); });

    var currentPages = [];
    var len = (designs.length > 6) ? 6 : designs.length;
    for (var i = 0; i < len; i++) {
      currentPages.push(designs[i]);
    }
    this.setState({
      activePage: 1,
      totalPages: designs.length,
      designs: designs,
      currentList: currentPages,
      loading: false,
      filter: {
        "language": "All",
        "year": "All",
        "rating": [0.0, 5.0]
      },
      searchText: text
    });
  }


  render() {
    if (this.state.loading) {
      return <Backdrop open={this.state.loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    }
    return (
      <>
        <Helmet>
          <title>Popcorn Tales - Movie Designs & Analysis</title>
          <meta name="description" content="Find the latest movies designs from various Indian and Foreign languages" />
        </Helmet>
        {
        !this.state.loading && <div>
          <div className={this.state.loading ? 'hidden' : 'App'}>
          <AppBar id="appBar" position="static">
              <Toolbar>
                <SocialMenu />
                <h1 id="title">Popcorn Tales</h1>
              </Toolbar>
            </AppBar>
            <div className="d-flex justify-content-center searchBar">
            <input type="text" id="searchField" value={this.state.searchText} onChange={this.onSearch} placeholder="Design" />
              </div>
            <CardsList designs={this.state.currentList} />
            <footer>
              <div className="d-flex justify-content-center">
                <Suspense fallback={<div>Loading...</div>}>
                  <Pagination totalRecords={this.state.totalPages} pageLimit={6} landingPage={this.state.activePage}
                    pageNeighbours={1}
                    onPageChanged={this.onPageChanged} />
                </Suspense>
              </div>
              {/* <div className="d-flex justify-content-center">
                <h6>Need your feedback to improve
              <a href="mailto:popcorntales19@gmail.com"> <MailIcon /></a>
                </h6>
              </div> */}
            </footer>
          </div>
        </div>
        }
      </>
    );
  }

}


export default Home;