import React, { Component } from "react";
import "../css/App.css";
import About from "./About";
import SearchPage from "./SearchPage"
import SignUpForm from "./SignUpForm.jsx"
import firebase from 'firebase/app'


import { Route, Switch } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import Favorites from "./Favorites";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schools: [],
      schoolName: '',
      user: '',
      schoolTuition: 1000,
      schoolState: '',
      updatedSchools: '',
      displayFavorited: false
    };

    this.handleSchoolName = this.handleSchoolName.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this)
    this.handleFilterInput = this.handleFilterInput.bind(this)
    this.handleSchoolState = this.handleSchoolState.bind(this)
    this.toggleFav = this.toggleFav.bind(this)
  }

  componentDidMount() {
    this.fetchData();
    this.authUnSubFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {

      if (firebaseUser) {
        this.setState(
          {
            user: firebaseUser
          }
        )
        firebase.database().ref('users/' + firebaseUser.uid + '/filterValue').once('value').then((snapshot) => {
          this.setState({ schoolTuition: parseInt(snapshot.val().filterValue) })
        });
      }
      else {
        this.setState({ user: null })
      }

    })
  }
  componentWillUnmount() {
    this.authUnSubFunction()
  }

  handleSignUp = (name, email, password) => {
    this.setState({ errorMessage: null }); //clear any old errors
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {

        let firebaseUser = userCredentials.user

        firebase.database().ref('users/' + firebaseUser.uid + '/filterValue').set({
          filterValue: this.state.schoolTuition
        });
        let updatePromise = firebaseUser.updateProfile(
          {
            displayName: name
          });
        return updatePromise
      })
      .catch((err) => {
        this.setState(
          { errorMessage: err.message }
        )
      })
  }

  //A callback function for logging in existing users
  handleSignIn = (email, password) => {
    this.setState({ errorMessage: null }); //clear any old errors
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch((err) => {
        this.setState(
          { errorMessage: err.message }
        )
      })

  }

  //A callback function for logging out the current user
  handleSignOut = () => {
    this.setState({ errorMessage: null }); //clear any old errors
    firebase.auth().signOut()
      .catch((err) => {
        this.setState(
          { errorMessage: err.message }
        )
      })
  }

  toggleFav = () => {
    if (this.state.displayFavorited === true) {
      this.setState({ displayFavorited: false })
    } else {
      this.setState({ displayFavorited: true })
    }
  }

  /***************************** Form Stuff*/
  handleSchoolName(e) {
    this.setState({ schoolName: (e.target.value) }, () => {
      this.fetchData(this.state.schoolName);
    });
  }

  handleSchoolState(e) {
    this.setState({ schoolState: (e.target.value).toUpperCase() }, () => {
      this.fetchData(this.state.schoolState);
    });
  }

  handleFilterInput(FilterValue) {

    this.setState({ schoolTuition: FilterValue })

    if (this.state.user) {
      firebase.database().ref('users/' + this.state.user.uid + '/filterValue').set({
        filterValue: this.state.schoolTuition
      });
    }

    let tutionOutofState = Object.keys(this.state.schools).map(schools => {
      return this.state.schools[schools]
    })

    let updatedSchools = tutionOutofState.filter(eachschool => {
      let school = eachschool.OutOfStateTuition <= this.state.schoolTuition
      return school
    })

    this.setState({ updatedSchools })

  }

  // this method is fetching api and formats the returned data
  fetchData(SearchQuery) {

    let states = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC",
      "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA",
      "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE",
      "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC",
      "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"]
    let fetchThis;

    if (states.indexOf(SearchQuery) > -1) {
      fetchThis = `https://api.data.gov/ed/collegescorecard/v1/schools?school.state=${SearchQuery}&_per_page=50&_fields=school.name,school.city,school.state,school.school_url,location.lat,location.lon,latest.admissions.admission_rate.overall,latest.admissions.sat_scores.average.overall,latest.cost.tuition.out_of_state,latest.cost.tuition.in_state,latest.aid.students_with_any_loan,latest.student.size&api_key=kSIC8EZipZTx5YinVli2GJWtCxRRs5NKvtmQwmvg`;
    }
    else {
      fetchThis = `https://api.data.gov/ed/collegescorecard/v1/schools?school.name=${SearchQuery}&_per_page=50&_fields=school.name,school.city,school.state,school.school_url,location.lat,location.lon,latest.admissions.admission_rate.overall,latest.admissions.sat_scores.average.overall,latest.cost.tuition.out_of_state,latest.cost.tuition.in_state,latest.aid.students_with_any_loan,latest.student.size&api_key=kSIC8EZipZTx5YinVli2GJWtCxRRs5NKvtmQwmvg`
    }


    fetch(fetchThis)
      .then(res => {
        return res.json();
      })
      .then(
        data => data.results.map(school => ({
          name: `${school["school.name"]}`,
          location: `${school["school.city"]},${school["school.state"]}`,
          AcceptanceRate: this.unReported(`${parseFloat(school["latest.admissions.admission_rate.overall"])}`),
          // AcceptanceRate: this.unReported(`${parseFloat(school["latest.admissions.admission_rate.overall"]).toFixed(2)}`, true),
          AverageSATScore: this.unReported(`${school["latest.admissions.sat_scores.average.overall"]}`),//`${school["latest.admissions.sat_scores.average.overall"]}`,
          OutOfStateTuition: this.unReported(`${school["latest.cost.tuition.out_of_state"]}`),
          InStateTuition: this.unReported(`${school["latest.cost.tuition.in_state"]}`),
          StudentsWithAnyLoan: `${parseFloat(school["latest.aid.students_with_any_loan"]).toFixed(2)}`,
          StudentsSize: this.unReported(`${school["latest.student.size"]}`),
          SchoolWebsite: `${school["school.school_url"]}`,
          Lat: `${school['location.lat']}`,
          Long: `${school['location.lon']}`,
          Favorited: false
        }))
      )
      .then(schoolResults => {
        this.setState({ schools: schoolResults })
      })
      .catch(error => {
        console.log(error);
      });
  }

  unReported(schoolStat) {

    if (schoolStat === 'null' || isNaN(schoolStat)) {
      console.log(schoolStat + " " + isNaN(schoolStat));
      schoolStat = "null";
      return "Unreported";
    } else {
      return schoolStat;
    }
  }

  render() {
    let schools;

    if (this.state.updatedSchools.length >= 1) {
      schools = this.state.updatedSchools

    } else {
      schools = this.state.schools

    }
    return (
      <div>
        <Navigation currentUser={this.state.user} handleSignOut={this.handleSignOut} />
        <main>
          <Switch>
            <Route exact path='/' render={(routerProps) => {
              return <SearchPage {...routerProps}
                // this component imports  all other components, 
                //so we pass all data needed for this component and all other components it imports
                toggleFav={this.toggleFav}
                currentUser={this.state.user}
                schoolData={schools}
                handleSchoolName={this.handleSchoolName}
                handleSchoolState={this.handleSchoolState}
                handleFilterInput={this.handleFilterInput}
                UserFilterInput={this.state.tuition}
                displayFavorited={this.state.displayFavorited}
                filterValue={this.state.schoolTuition}
              />
              
            }} />
           
            <Route path="/about" component={About} />
            <Route path='/favorites' render={(routerProps) => {
              return <Favorites {...routerProps} currentUser={this.state.user} />
            }} />
            <Route path='/SignUpForm' render={(routerProps) => {
              return <SignUpForm {...routerProps} signUpCallback={this.handleSignUp} signInCallback={this.handleSignIn} />
            }} />
          </Switch>

          <script src="https://cdnjs.cloudflare.com/ajax/libs/fetch/2.0.3/fetch.min.js" />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/es6-promise/4.1.1/es6-promise.auto.js" />

        </main>

        <footer className="page-footer font-small sticky-bottom">
          <Footer />
        </footer>
      </div>
    );
  }
}

// one nav component
class Navigation extends Component {
  render() {
    let loginLink = null;

    if (this.props.currentUser) {
      loginLink = <Link onClick={this.props.handleSignOut} to="/#Home" className="nav-link">SIGN OUT</Link>
    } else {
      loginLink = <Link to="/SignUpForm" className="nav-link">SIGN IN</Link>
    }

    return (
      <header>
        <div className = "navbarWrapper_SVG">
          <nav className="navbar fixed-top navbar-expand-lg navbarWrapper_SVG">
            <Link className="navbar-brand" to="/#Home"><h3 className="navBrand">CollegeStudio</h3></Link>
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
              <ul className="navbar-nav mr-auto">
              </ul>
              <ul className="nav navbar-nav NavLinkz">
                <li className="nav-item ">
                  <Link to="#Home" className="nav-link">HOME</Link>
                </li>
                <li className="nav-item ">
                  <Link to="/#SideBar" className="nav-link">SEARCH</Link>
                </li>
                <li className="nav-item">
                  <Link to="/about" className="nav-link">USAGE</Link>
                </li>
                <li className="navDivider"></li>
                <li className="nav-item">
                  {loginLink}
                </li>
                <li className="nav-item">
                  <Link to="/favorites" className="nav-link">FAVORITES</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    );
  }
}

//one footer component 
class Footer extends Component {
  render() {
    return (
      <div>
        <div className="container text-center text-md-left mt-5 footerCS">
          <div className="row mt-3 footerCS">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase font-weight-bold">CollegeStudio</h6>
              <hr className="line" />
              <p>Home for your future school.This is how you find the perfect college—or colleges—for you.</p>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase font-weight-bold">Sources</h6>
              <hr className="line" />
              <p>
                <a href="https://collegescorecard.ed.gov/data/documentation/">API</a>
              </p>
            </div>
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase font-weight-bold">Contact</h6>
              <hr className="line" />
              <p><i className="fa fa-home mr-3"></i> Seattle, WA 98027, US</p>
              <p><i className="fa fa-envelope mr-3"></i> <a href="mailto: info@example.com">CollegeStudio@uw.edu</a></p>

            </div>
          </div>
        </div>
      
      </div>
    );
  }
}

export default App
