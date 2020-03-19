import * as api from "./judge0-api.js";

function sleep(millsec) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, millsec);
  });
}

export async function run(source_code, language, input) {
  let param = {
    source_code,
    language,
    input
    // longpoll,
    // longpoll_timeout
  };
  if (param.source_code == "") {
    throw new Error("source code empty");
  }
  let data = await api.create(param);

  let id = data.id;
  let status = data.status;
  if (!id) {
    throw new Error("create failed");
  }
  while (status != "completed") {
    await sleep(2000);
    data = await api.getStatus({
      id
    });
    status = data.status;
  }
  data = await api.getDetails({
    id
  });
  return data;
  // build_exit_code: 0
  // build_memory: 31316000
  // build_result: null
  // build_stderr: null
  // build_stdout: null
  // build_time: null
  // connections: 0
  // exit_code: 0
  // id: "u-Ka4BLu4qJrhGcUJ44QpQ"
  // language: "javascript"
  // memory: 31316000
  // note: null
  // result: "success"
  // status: "completed"
  // stderr: ""
  // stdout: ""
  // time: "0.05"
}
