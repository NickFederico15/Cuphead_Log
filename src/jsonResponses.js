// Note this object is purely in memory
// When node shuts down this will be cleared.
// Same when your heroku app shuts down from inactivity
// We will be working with databases in the next few weeks.
const users = {};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const getLogs = (request, response) => {
  if (request.method === 'GET') {
    const responseJSON = {
      users,
    };

    respondJSON(request, response, 200, responseJSON);
  } else {
    respondJSONMeta(request, response, 200);
  }
};

const addLog = (request, response, body) => {
  const responseJSON = {
    message: 'All fields are required',
  };

  if (!body.name || !body.boss || !body.deaths || !body.strategy) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  if (users[body.name]) {
    responseCode = 204;
  } else {
    users[body.name] = {};
  }

  users[body.name].name = body.name;
  users[body.name].boss = body.boss;
  users[body.name].deaths = body.deaths;
  users[body.name].strategy = body.strategy;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

const notReal = (request, response) => {
  if (request.method === 'GET') {
    const responseJSON = {
      id: 'notFound',
      message: 'The page you are looking for was not found',
    };

    respondJSON(request, response, 404, responseJSON);
  } else {
    respondJSONMeta(request, response, 404);
  }
};

module.exports = {
  getLogs,
  addLog,
  notReal,
};
