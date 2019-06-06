import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import actions from "../../_common/actions";
import { connect } from 'react-redux';
import classnames from "classnames";


const QUERIES = [
  "Order pizza",
  "Order pizza with pepperoni and a salad",
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

