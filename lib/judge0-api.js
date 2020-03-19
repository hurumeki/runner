const apiUrl = "http://localhost:3000/";
const path = "/submissions";

export async function create(param) {
    const data = {}
    data.source_code = param.source_code;
    data.language_id = param.language;
    data.stdin = param.input;

    let res = await fetch(apiUrl + path, {
        headers: { "content-type": "application/json" },
        method: "post",
        body: JSON.stringify(data)
    });
    let json = await res.json();
    const result = {}
    result.id = json.token
    result.status = "running"
    return result;
}

export async function getStatus(param) {
    const data = {};
    data.token = param.id;
    let res = await fetch(apiUrl + path + "/" + data.token);
    let json = await res.json();
    const result = {}
    if (json.status.id > 2) {
        result.status = "completed"
    } else {
        result.status = "running"
    }
    return result;
}

export async function getDetails(param) {
    const data = {};
    data.token = param.id;
    let res = await fetch(apiUrl + path + "/" + data.token);
    let json = await res.json();
    return json;
}

export async function getLanguages() {
    let res = await fetch(apiUrl + "/languages");
    return await res.json()
}
export function getSyntaxModes() {
    return {
        "43": "plain_text",
        "44": "plain_text",
        "45": "plain_text",
        "46": "sh",
        "47": "plain_text",
        "48": "c_cpp",
        "49": "c_cpp",
        "50": "c_cpp",
        "51": "csharp",
        "52": "c_cpp",
        "53": "c_cpp",
        "54": "c_cpp",
        "55": "lisp",
        "56": "d",
        "57": "elixir",
        "58": "erlang",
        "59": "plain_text",
        "60": "golang",
        "61": "haskell",
        "62": "java",
        "63": "javascript",
        "64": "plain_text",
        "65": "plain_text",
        "66": "plain_text",
        "67": "plain_text",
        "68": "php",
        "69": "plain_text",
        "70": "python",
        "71": "python",
        "72": "ruby",
        "73": "rust",
        "74": "javascript"
    }
}