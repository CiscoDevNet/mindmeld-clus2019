import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import get from 'lodash.get';

import Tag from './tag-component';
import QueryInput from './query-input-component';
import { connect } from 'react-redux';


class DialogueManager extends Component {

  static propTypes = {
    result: PropTypes.object
  };

  render() {
    const result = get(this, 'props.result'),
          replies = get(result, 'replies'),
          hints = get(result, 'hints'),
          targetDialogueState = get(result, 'targetDialogueState');

    return (
      <Container className="section dialogue-manager">
        <Row>
          <Col>
            <p>
              The dialogue manager formulates the response to return to the user. It relies on machine learning or rule-based models to determine the most likely form, or dialogue state, for the response. It employs natural language generation to enable a familiar, human-like interaction.
            </p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <QueryInput/>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Tag body="user content" />
            <Tag body="dialogue history" />
            <Tag body="target domain" />
            <Tag body="target intent" />
            <Tag body="resolved entities" />
            <Tag body="resolved dependencies" />
            <Tag body="resolved answer" />
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              The output of the dialogue manager includes the target dialogue state of the response. The target dialogue state prescribes the form of the natural language replies as well as any other recommendations or interactive elements which may be helpful to the user. The dialogue manager also returns a set of predictive suggestions to enable one-tap execution for the most likely user actions.
            </p>
          </Col>
        </Row>
        {
          result && (
            <div>
              {
                targetDialogueState && (
                  <Row>
                    <Col>
                      <Tag label="target dialogue state" body={targetDialogueState}/>
                    </Col>
                  </Row>
                )
              }
              <Row>
                {
                  !!replies.length && (
                    <Col>
                      <div className="label">natural language replies:</div>
                      {
                        replies.map((reply, index) => {
                          return <div className="reply" key={index}>{reply}</div>;
                        })
                      }
                    </Col>
                  )
                }
                {
                  !!hints.length && (
                    <Col>
                      <div className="tree">
                        <div className="label">predictive suggestions:</div>
                        <ul>
                          {
                            hints.map((hint, index) => {
                              return (
                                <li key={index}>
                                  <Tag body={hint} uncapped/>
                                </li>
                              );
                            })
                          }
                        </ul>
                      </div>
                    </Col>
                  )
                }
              </Row>
            </div>
          )
        }
      </Container>
    );
  }
}


export const mapStateToProps = (state) => {
  const { result } = state.app;

  return {
    result
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogueManager);
