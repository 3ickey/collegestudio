import React, { Component } from "react";
 class SideBar extends Component {
    render() {
      return (
        <div >
          <div className="input-group mb-3" id="form">
            <label htmlFor="searchQuery" className="mr-2" id="searchLabel">
              <br />
              Welcome.
            <br />
              <br />
              Search for the perfect school by entering the name of the university, community college,
              or grad school. Results will update as partial or complete names.
            <br />
              <br />
  
            </label>
            <hr />
            <input
              type="text"
              className="form-control"
              id="searchQuery"
              placeholder="School name.."
              name="schoolName"
              aria-label="School Name"
              aria-describedby="basic-addon2"
              onChange={this.props.handleUserInput.bind(this)}
            />
  
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                id="searchButton"
                type="button"
                onClick={this.props.handleSubmit.bind(this)}>
                Search
              </button>
            </div>
          </div>
  
          <div className="input-group mb-3" id="form">
            <label htmlFor="searchQuery" className="mr-2" id="searchLabel">
              Otherwise, if you are unsure of what specific school too look at, then please enter
              a state to get information on university and colleges within your selected area.
              (ex. "WA")
              <br />
              <br />
            </label>
            <hr />
  
            <input
              type="text"
              className="form-control"
              id="searchQueryDemo"
              placeholder="School state.."
              name="schoolState"
              aria-label="State Name"
              aria-describedby="basic-addon2"
              onChange={this.props.handleUserInput.bind(this)} />
  
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                id="searchButton2"
                type="button"
                onClick={this.props.handleSubmit.bind(this)}>
                Search
            </button>
            </div>
          </div>
  
          <br />
          <hr />
          <div className="container">
            <a
              href="https://www2.ed.gov/rschstat/landing.jhtml?src=pn"
              className=" DataFrom badge "
              target="_blank" rel="noopener noreferrer">
              Data from U.S. Department of Education.
            </a>
          </div>
        </div>
      )
    }
  }

  export default SideBar