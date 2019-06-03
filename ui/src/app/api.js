import axios from 'axios';
import get from 'lodash.get';


const TOKEN = process.env.WEBEX_TOKEN || '';
const URI = process.env.API_URI || 'https://assistant-nlp-intb.wbx2.com/assistant-nlp/api/v1/parse';

export const query = async (body) => {
  if (typeof body === 'string') {
    body = {
      text: body,
      params: {'time_zone': "Europe/Brussels"}
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
        entities = get(data, 'entities', [])
                    .map((entity) => {
                      return {
                        text: entity.text,
                        type: entity.type,
                        score: entity.score,
                        span: entity.span,
                        role: entity.role,
                        value: (entity.value || {}),
                        children: (entity.children || []),
                      };
                    }),
        user_carousel = directives.find((item) => item.name === 'user-carousel'),
        pmr_carousel = directives.find((item) => item.name === 'pmr-carousel');

  return {
    domain: data.domain,
    intent: data.intent,
    entities,
    replies,
    hints,
    targetDialogueState,
    user_carousel,
    pmr_carousel,
    response: {
      ...data
    },
    scores: data.scores,
  };
};
