import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import actions from '_common/actions';


class QueryInput extends Component {

  static propTypes = {
    query: PropTypes.string,
    startRecognition: PropTypes.func,
    updateQuery: PropTypes.func,
    executeQuery: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.handleTranscripts = this.handleTranscripts.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleTranscripts(transcripts) {
    this.props.updateQuery(transcripts[0].transcript);
    this.props.executeQuery();
  }

  handleOnChange(event) {
    this.props.updateQuery(event.target.value);
  }

  handleOnSubmit(event) {
    this.props.executeQuery();
    event.preventDefault();
  }

  render() {
    const { query, startRecognition } = this.props;

    return (
      <span className="query-input">
        <form onSubmit={this.handleOnSubmit}>
          <input type="text" className="text" value={query} onChange={this.handleOnChange} />
        </form>
        <span className="mic" onClick={() => startRecognition(this.handleTranscripts)} />
      </span>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    query: state.app.query
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    updateQuery: (query) => dispatch(actions.app.updateQuery(query)),
    startRecognition: (handler) => dispatch(actions.recognition.start(handler)),
    executeQuery: () => dispatch(actions.app.executeQuery()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QueryInput);

