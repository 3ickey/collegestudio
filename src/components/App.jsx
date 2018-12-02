import React, { Component } from "react";
import "../css/App.css";
import About from "./About";
import SearchPage from "./SearchPage"


import { Route, Switch, NavLink } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schools: [],
      input: null
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.fetchData();
  }

  handleUserInput(e) {
    this.setState({ input: (e.target.value).toUpperCase() }, () => {
      this.fetchData(this.state.input);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.fetchData(this.state.input)
  }

  fetchData(SearchQuery) {
    let states = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC",
      "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA",
      "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE",
      "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC",
      "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"]

    let fetchThis;
    // states.includes(SearchQuery)
    if (states.indexOf(SearchQuery) > -1) {
      fetchThis = `https://api.data.gov/ed/collegescorecard/v1/schools?school.state=${SearchQuery}&_fields=school.name,school.city,school.state,school.school_url,location.lat,location.lon,latest.admissions.admission_rate.overall,latest.admissions.sat_scores.average.overall,latest.cost.tuition.out_of_state,latest.cost.tuition.in_state,latest.aid.students_with_any_loan,latest.student.size&api_key=TH798jh0Un4LIFZvxWD5iyBwYKSDCpRLVZEWDdR5`;
    }
    else {
      fetchThis = `https://api.data.gov/ed/collegescorecard/v1/schools?school.name=${SearchQuery}&_fields=school.name,school.city,school.state,school.school_url,location.lat,location.lon,latest.admissions.admission_rate.overall,latest.admissions.sat_scores.average.overall,latest.cost.tuition.out_of_state,latest.cost.tuition.in_state,latest.aid.students_with_any_loan,latest.student.size&api_key=TH798jh0Un4LIFZvxWD5iyBwYKSDCpRLVZEWDdR5`;
    }


    fetch(fetchThis)
      .then(res => {
        return res.json();
      })
      .then(
        data => data.results.map(school => ({
          name: `${school["school.name"]}`,
          location: `${school["school.city"]},${school["school.state"]}`,
          AcceptanceRate: `${parseFloat(school["latest.admissions.admission_rate.overall"]).toFixed(2)}`,
          AverageSATScore: `${school["latest.admissions.sat_scores.average.overall"]}`,
          OutOfStateTuition: `${school["latest.cost.tuition.out_of_state"]}`,
          InStateTuition: `${school["latest.cost.tuition.in_state"]}`,
          StudentsWithAnyLoan: `${parseFloat(school["latest.aid.students_with_any_loan"]).toFixed(2)}`,
          StudentsSize: `${school["latest.student.size"]}`,
          SchoolWebsite: `${school["school.school_url"]}`,
          Lat: `${school['location.lat']}`,
          Long: `${school['location.lon']}`
        }))
      )
      .then(schoolResults => {
        this.setState({ schools: schoolResults })
      })
      .catch(error => {
        alert(error);
      });
  }

  render() {
    return (
      <div>
        <Navigation />
        <main>
          <Switch>
            <Route exact path='/' render={(routerProps) => {
              return <SearchPage {...routerProps} schoolData={this.state.schools} handleUserInput={this.handleUserInput} handleSubmit={this.handleSubmit} />
            }} />
            <Route path="/about" component={About} />
          </Switch>

          <script src="https://cdnjs.cloudflare.com/ajax/libs/fetch/2.0.3/fetch.min.js" />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/es6-promise/4.1.1/es6-promise.auto.js" />

        </main>

        <footer className="page-footer font-small unique-color-dark">
          <Footer />
        </footer>
      </div>
    );
  }
}


class Navigation extends Component {
  render() {
    return (
      <header>
        <nav className="navbar fixed-top navbar-expand-lg">
          <a className="navbar-brand" href="index.html">
            <Link to="/#Home"><h3 className="navBrand">CollegeStudio</h3></Link>
          </a>
          <button
            className="navbar-toggler collapsed"
            type="button" data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div id="navbarNavDropdown" className="navbar-collapse collapse">
            <ul className="navbar-nav mr-auto"></ul>
            <ul className="nav navbar-nav NavLinkz">
              <li className="nav-item ">
                <Link exact to="/#Home" className="nav-link">Home</Link>
              </li>
              <li className="nav-item ">
                <a className="nav-link " href="/#SideBar">
                  Find
                </a>
                
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">About</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

class Footer extends Component {
  render() {
    return (
      <div>
        <div className="container text-center text-md-left mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase font-weight-bold">CollegeStudio</h6>
              <hr className="line" />
              <p>Home for your future school.This is how you find the perfect college—or colleges—for you</p>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase font-weight-bold">Sources</h6>
              <hr className="line" />
              <p>
                <a className="fotterLinks" href="https://collegescorecard.ed.gov/data/documentation/">API</a>
              </p>
            </div>
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase font-weight-bold">Contact</h6>
              <hr className="line" />
              <p><i className="fa fa-home mr-3"></i> Seattle, WA 98027, US</p>
              <p><i className="fa fa-envelope mr-3"></i> <a className="contact" href="mailto: info@example.com">info@example.com</a></p>
              <p><i className="fa fa-phone mr-3"></i> <a className="contact" href="tel: 01 234 567 88">+ 01 234 567 88</a></p>

            </div>
          </div>
        </div>
        <div className="footer-copyright text-center py-3">© 2018 Copyright
    </div>
      </div>
    );
  }
}

export default App