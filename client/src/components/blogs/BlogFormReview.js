// BlogFormReview shows users their form inputs for review
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import formFields from './formFields';
import * as actions from '../../actions';

class BlogFormReview extends Component {
  constructor(props) {
    super(props);
    this.state = { file: null };
    this.onFileChange = this.onFileChange.bind(this);
  }

  onFileChange(e) {
    this.setState({ file: e.target.value.files[0] });
  }

  onSubmit(event) {
    event.preventDefault();

    const { submitBlog, history, formValues } = this.props;
    const { file } = this.state;

    submitBlog(formValues, file, history);
  }

  renderFields() {
    const { formValues } = this.props;

    return _.map(formFields, ({ name, label }) => (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    ));
  }

  renderButtons() {
    const { onCancel } = this.props;

    return (
      <div>
        <button
          className="yellow darken-3 white-text btn-flat"
          onClick={onCancel}
        >
          Back
        </button>
        <button className="green btn-flat right white-text">
          Save Blog
          <i className="material-icons right">email</i>
        </button>
      </div>
    );
  }


  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <h5>Please confirm your entries</h5>
        {this.renderFields()}

        <h5>Add An image</h5>
        <input
          onChange={this.onFileChange}
          type="file"
          accept="image/*"
        />

        {this.renderButtons()}
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { formValues: state.form.blogForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(BlogFormReview));
