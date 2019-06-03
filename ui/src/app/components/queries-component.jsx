import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import actions from "../../_common/actions";
import { connect } from 'react-redux';
import classnames from "classnames";


const QUERIES = [
  "Schedule a meeting from 10 to 11am",
  "Farallon",
  "Set up a meeting from 3 to 4:30 in Kabuto",
  "Call John the engineer and Chris Smith the PM",
  "Start a meeting with David Lee the network engineer",
  "Join Ravi's PMR",
  "Join Jose Gonzalez's personal meeting room",
  "Call Hernandez",
  "Can you connect me to Amit Sharma?",
  "Place a call to Santosh the web developer",
  "Turn on bluetooth",
  "Answer the call",
  "You are the best personal assistant.",
  "What's the date today?",
  "Who are you?",
  "Who made you?",
  "What is AI?",
  "Do you understand chinese?",
  "Call 02 513 73 44",
  "Yes",
  "Call + 32 02 622 73 44",
  "Call 5551231234",
  "Turn the temperature up",
  "How nice is it outside?",
  "Share my laptop screen",
  "Enable bluetooth for me",
  "Mute the microphone please",
  "Start recording the meeting",
  "Stop the meeting recording",
  "Open a whiteboard for me",
  "Save the whiteboard as diagram1",
];

class Queries extends Component {

  static propTypes = {
    query: PropTypes.string,
    updateQuery: PropTypes.func,
    executeQuery: PropTypes.func,
  };

  updateQuery(query) {
    this.props.updateQuery(query);
    this.props.executeQuery();
  }

  render() {
    const { query } = this.props;

    return (
      <Container fluid className="queries-container">
        <Row>
          <Col className="pt-3 pb-3">
            { QUERIES.map((stringQuery, index) => {
              const classNames = classnames(
                'query',
                { 'active': stringQuery.toLowerCase() === query.toLowerCase() }
              );
              return <p key={`query-${index}`} className={classNames} onClick={() => this.updateQuery(stringQuery)}>
                { stringQuery }
              </p>;
            })}
          </Col>
        </Row>
      </Container>
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
    executeQuery: () => dispatch(actions.app.executeQuery()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Queries);

