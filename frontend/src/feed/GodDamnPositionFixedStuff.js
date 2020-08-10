import { StudentProfile } from '@/feed/FeedLeftStuff/StudentProfile';
import { Col, Row } from 'antd';
import React from 'react';
import { FeedItSelf } from './FeedMiddleStuff/FeedItSelf';
import { FeedFollowSuggestion } from './FeedRightStuff/FeedFollowSuggestion';
import { FeedJobSuggestion } from './FeedRightStuff/FeedJobsSuggestion';


function GodDamnPositionFixedStuff(props) {

  return (
    <>
      <Row style={{ margin: 16 }}>
        <Col span={7} >
          <Row justify="end" style={{ paddingRight: 24 }}>
            <StudentProfile />
          </Row>
        </Col>
        <Col span={10}>
          <FeedItSelf />
        </Col>
        <Col span={7}>
          <Row style={{ paddingTop: 0, paddingLeft: 24 }}>
            <FeedFollowSuggestion />
          </Row>
          <Row style={{ paddingTop: 16, paddingLeft: 24 }}>
            <FeedJobSuggestion />
          </Row>
        </Col>
      </Row>
    </>
  )
}

export { GodDamnPositionFixedStuff };
