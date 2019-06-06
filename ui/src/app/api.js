import axios from 'axios';
import get from 'lodash.get';


const TOKEN = process.env.WEBEX_TOKEN || '';
const URI = 'http://127.0.0.1:7150/parse';

export const query = async (body) => {
  if (typeof body === 'string') {
    body = {
      text: body
    };
  }

  const result = await axios({
    method: 'post',
    baseURL: URI,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN}`
    },
    data: body
  });

  const { data } = result,
        directives = get(data, 'directives', []),
        replies = directives
                    .filter((item) => item.name === 'reply')
                    .map((item) => get(item, 'payload.text')),
        hints = get(directives.find((item) => item.name === 'ui-hint'), 'payload.text', []),
        targetDialogueState = get(data, 'frame.follow_up.target_state'),
        entities = get(data.request, 'entities', [])
                    .map((entity) => {
                      return {
                        text: entity.text,
                        type: entity.type,
                        score: entity.score,
                        span: entity.span,
                        role: entity.role,
                        value: (entity.value || []),
                        children: (entity.children || []),
                      };
                    });

  const kbObjects = [];
  entities.map((entity) => {
    entity['value'].map((value) => {
      kbObjects.push(value);
    });
  });

  let index = 0;
  data.request.confidences.entities.map((entity) => {
    entities[index]['score'] = entity[Object.keys(entity)[0]];
    index++;
  });

  return {
    domain: data.request.domain,
    intent: data.request.intent,
    entities,
    replies,
    hints,
    targetDialogueState,
    response: {
      ...data
    },
    scores: data.request.confidences,
    kbObjects,
  };
};
