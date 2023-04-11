import http from 'k6/http';
import { sleep, check } from 'k6';

const DAPR_HOST = __ENV.DAPR_HOST || "http://localhost";
const DAPR_HTTP_PORT = __ENV.DAPR_HTTP_PORT || "3500";
const PUBSUB_NAME = "dummyservice";
const PUBSUB_TOPIC = "load";

export const options = {
  stages: [
    { duration: '5s', target: 20 },
    { duration: '5s', target: 10 },
    { duration: '5s', target: 0 },
  ],
};

export default function () {
  const res = http.post(`${DAPR_HOST}:${DAPR_HTTP_PORT}/v1.0/publish/${PUBSUB_NAME}/${PUBSUB_TOPIC}`, 'test');

  check(res, { 'status was 204': (r) => r.status == 204 })
  sleep(1);
}
