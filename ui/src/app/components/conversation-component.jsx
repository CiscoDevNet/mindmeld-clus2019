import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import get from 'lodash.get';
import classnames from 'classnames';

import logo from '_assets/images/logo_orange.png';
import actions from '_common/actions';


class Side extends Component {
  static propTypes = {
    user: PropTypes.bool,
    text: PropTypes.string,
  };

  render() {
    const { user, text } = this.props;

    const classNames = classnames(
      'bubble',
      'mb-3',
      { user: user }
    );

    const colProps = {
      size: 8,
      offset: user ? 4 : 0
    };

    return (
      <Container fluid>
        <Row>
          { !user && <Col className="logo">
            <img src={logo} width={24} height={24} />
          </Col> }
          <Col className={classNames} xs={colProps}>
            {text}
          </Col>
        </Row>
      </Container>
    );
  }
}

class Carousel extends Component {
  static propTypes = {
    carousel: PropTypes.object,

    onItemClick: PropTypes.func,
  };

  render() {
    const { carousel, onItemClick } = this.props;

    const cardPerPage = 4;
    const currentPage = carousel.currentPage || 0;
    let displayCards = [];
    for (let i = 0; i < cardPerPage; i++) {
      const adjustedIndex = i + cardPerPage*currentPage;
      if (adjustedIndex < carousel.payload.length) {
        displayCards.push(carousel.payload[adjustedIndex]);
      }
    }

    return <div className="carousel mb-3">
      {
        displayCards.map((item, index) => {
          return <div className="item" key={item.id} onClick={() => onItemClick(`option ${index + 1 + cardPerPage*currentPage}`)}>
            <div className="text">{item.displayName}</div>
          </div>;
        })
      }
    </div>;
  }
}

class Hints extends Component {
  static propTypes = {
    data: PropTypes.array,

    onItemClick: PropTypes.func,
  };

  render() {
    const { data, onItemClick } = this.props;
    return <div className="hints mb-3">
      {
        data.map((item, index) => {
          return <div className="bubble mr-2 mb-2" key={index} onClick={() => onItemClick(item)}>{item}</div>;
        })
      }
    </div>;
  }
}

class Turn extends Component {
  static propTypes = {
    data: PropTypes.object,
    updateQuery: PropTypes.func,
    executeQuery: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.onFollowUp = this.onFollowUp.bind(this);
  }

  onFollowUp(text) {
    const { updateQuery, executeQuery } = this.props;

    updateQuery(text);
    executeQuery();
  }

  render() {
    const { data } = this.props,
          directives = get(data, 'directives', []),
          requestText = get(data, 'request.text'),
          responseText = get(directives.find((item) => item.name === 'reply'), 'payload.text', ''),
          carousel = directives.find((item) => item.name === 'user-carousel') || directives.find((item) => item.name === 'pmr-carousel'),
          hints = get(directives.find((item) => item.name === 'ui-hint'), 'payload.text', []);

    return (
      <Row>
        <Col>
          { requestText && <Side user text={requestText} /> }
          { responseText && <Side text={responseText} /> }
          { carousel && <Carousel carousel={carousel} onItemClick={this.onFollowUp} /> }
          { !!hints.length && <Hints data={hints} onItemClick={this.onFollowUp} /> }
        </Col>
      </Row>
    );

  }
}

const ConnectedTurn = connect(null, (dispatch) => {
  return {
    updateQuery: (query) => dispatch(actions.app.updateQuery(query)),
    executeQuery: () => dispatch(actions.app.executeQuery()),
  };
})(Turn);

class Conversation extends Component {

  static propTypes = {
    conversation: PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.conversationRef = React.createRef();
  }

  componentDidUpdate() {
    const node = this.conversationRef.current;
    if (node.scrollTo) {
      node.scrollTo({
        top: node.scrollHeight,
        behavior: 'smooth'
      });
    } else {
      node.scrollTop = node.scrollHeight;
    }
  }

  render() {
    const { conversation } = this.props;

    return (
      <div className="container-fluid conversation pt-3" ref={this.conversationRef}>
        {
          conversation && conversation.map((item, index) => {
            return <ConnectedTurn data={item} key={index} />;
          })
        }
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  const conversation = state.app.conversation;

  return {
    conversation
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
