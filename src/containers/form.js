import React, { Component } from 'react';

export default class Form extends Component {

  constructor(props) {
    super(props);

    this.state = {
      phone: '',
      phoneValid: false,
      ssn: '',
      ssnValid: false,
      dob: '',
      dobValid: false,
      list: []
    };
  }

  // Renders a list of the entries
  renderList(entry) {
    return (
      <tr key={entry.ssn}>
        <td>{entry.phone}</td>
        <td>{entry.ssn}</td>
        <td>{entry.dob}</td>
      </tr>
    )
  }

  // This will save the phone number to the state
  onPhoneChange(event) {
    let phone = this.showPhone(event.target.value)
    this.setState({ phone });
    if (this.purifyPhone(phone).length === 10) {
      this.setState({ phoneValid: true });
    } else {
      this.setState({ phoneValid: false });
    }
  }

  // This will return the value that should be displayed for the phone #
  // LOGIC:
  //  The display format is: (XXX) XXX-XXXX
  //  As the user types the values the markup should be changed
  showPhone(value) {
    let display = '';
    let pure = this.purifyPhone(value);
    //console.log("pure is: " + pure);
    if (pure.length > 6) {
      //console.log("pure is greater than 6");
      display = '(' + pure.substr(0,3) + ')' + ' ' + pure.substr(3,3) + '-' + pure.substr(6,4);
    } else if (pure.length > 3) {
      //console.log("pure is greater than 3");
      display = '(' + pure.substr(0,3) + ')' + ' ' + pure.substr(3,3);
    } else if (pure.length > 0 && pure !== '(') {
      //console.log("pure is greater than 0");
      display = '(' + pure.substr(0,3);
    }

    return display;
  }

  purifyPhone(display) {
    const reP = /\((\d{1,3})\)?\s?/;
    const reS = /\((\d{1,3})\)\s?(\d{1,3})-?/;
    const reW = /\((\d{1,33})\)\s(\d{1,3})-(\d{1,3})/;
    if (display.match(reW)) {
      //console.log('Matches with reW');
      return display.replace(reW, '$1$2$3');
    } else if (display.match(reS)) {
      //console.log('Matches with reS');
      return display.replace(reS, '$1$2');
    } else if (display.match(reP)) {
      //console.log('Matches with reP');
      return display.replace(reP, '$1');
    } else {
      //console.log('No match... must be no number entered');
      return display;
    }
  }

  // This will return the value that should be displayed for the SSN #
  // LOGIC:
  //  The display format is: XXX-XXX-XXXX
  //  As the user types the values the markup should be changed
  onSSNChange(event) {
    let ssn = this.showSNN(event.target.value);
    this.setState({ ssn });
    if (this.pureifySNN(ssn).length === 10) {
      this.setState({ ssnValid: true });
    } else {
      this.setState({ ssnValid: false });
    }
  }

  showSNN(value) {
    let display = '';
    let pure = this.pureifySNN(value);
    if (pure.length > 6) {
      display = pure.substr(0,3) + '-' + pure.substr(3,3) + '-' + pure.substr(6,4);
    } else if (pure.length > 3) {
      display = pure.substr(0,3) + '-' + pure.substr(3,3);
    } else {
      display = pure;
    }

    return display;
  }

  pureifySNN(number) {
    const re = /-/g; // Remove all '-'
    if (number.match(re)) {
      return number.replace(re, '');
    }

    return number;
  }

  // This will return the value that should be displayed for the DOB #
  // LOGIC:
  //  The display format is: XX/XX/XXXX
  //  As the user types the values the markup should be changed
  onDOBChange(event) {
    let dob = this.showDOB(event.target.value);
    this.setState({ dob });
    if (this.pureifyDOB(dob).length === 8) {
      this.setState({ dobValid: true });
    } else {
      this.setState({ dobValid: false });
    }
  }

  showDOB(value) {
    let display = '';
    let pure = this.pureifyDOB(value);
    if (pure.length > 4) {
      display = pure.substr(0,2) + '/' + pure.substr(2,2) + '/' + pure.substr(4,4);
    } else if (pure.length > 2) {
      display = pure.substr(0,2) + '/' + pure.substr(2,2);
    } else {
      display = pure;
    }

    return display;
  }

  pureifyDOB(number) {
    const re = /\//g;
    if (number.match(re)) {
      return number.replace(re, '');
    }

    return number;
  }

  // Do validation after form submission
  onFormSubmit(event) {
    event.preventDefault();

    if (this.state.phoneValid && this.state.ssnValid && this.state.dobValid) {
      let list = this.state.list.concat({phone: this.state.phone, ssn: this.state.ssn, dob: this.state.dob});
      this.setState({ list });
    } else {
      alert('Please correct all fields before submitting');
    }
  }

  render() {
    return (
      <div>
        <h1>Finrise Project</h1>
        <form
          className="form-horizontal"
          onSubmit={(event) => this.onFormSubmit(event)}
        >
        <div className="form-group">
          <label className="control-label">Enter your phone #</label>
          <input
            type="text"
            placeholder="(XXX) XXX-XXXX"
            className="form-control"
            value={this.state.phone}
            onChange={(event) => this.onPhoneChange(event)}
          />
        </div>
        <div className="form-group">
          <label className="control-label">Enter your SSN</label>
          <input
            type="text"
            placeholder="XXX-XX-XXXX"
            className="form-control"
            value={this.state.ssn}
            onChange={(event) => this.onSSNChange(event)}
          />
        </div>
        <div className="form-group">
          <label className="control-label">Enter your Date of Birth</label>
          <input
            type="text"
            placeholder="XX/XX/XXXX"
            className="form-control"
            value={this.state.dob}
            onChange={(event) => this.onDOBChange(event)}
          />
        </div >
          <span >
            <button type="submit" className="btn btn-secondary"> Submit </button>
          </span>
        </form>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Phone</th>
              <th>SSN</th>
              <th>DOB</th>
            </tr>
          </thead>
          <tbody>
            {this.state.list.map(this.renderList)}
          </tbody>
        </table>
      </div>
    )
  }
}
