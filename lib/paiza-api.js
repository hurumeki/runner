const apiUrl = "http://api.paiza.io";
const path = "/runners";
const apiKey = "guest";

function buildQuery(data) {
  let query = [];
  for (let k in data) {
    query.push(k + "=" + encodeURIComponent(data[k]));
  }
  return query.join('&')
}

export async function create(param) {
  const data = {
    api_key: apiKey
  };

  data.source_code = param.source_code;
  data.language = param.language;
  data.input = param.input;
  if (param.longpoll == true) {
    data.longpoll = true;
  }
  data.longpoll_timeout = param.longpoll_timeout;

  let res = await fetch(apiUrl + path + "/create?" + buildQuery(data), {
    method: "post"
  });
  let json = res.json();
  return json;
}

export async function getStatus(param) {
  const data = {
    api_key: apiKey
  };

  data.id = param.id;

  let res = await fetch(apiUrl + path + "/get_status?" + buildQuery(data));
  let json = res.json();
  return json;
}

export async function getDetails(param) {
  const data = {
    api_key: apiKey
  };

  data.id = param.id;

  let res = await fetch(apiUrl + path + "/get_details?" + buildQuery(data));
  let json = res.json();
  return json;
}
