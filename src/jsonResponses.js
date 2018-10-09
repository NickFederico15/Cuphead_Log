// Note this object is purely in memory
// When node shuts down this will be cleared.
// Same when your heroku app shuts down from inactivity
// We will be working with databases in the next few weeks.
const deathLogs = {};

let logNum = 1;

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const getLogs = (request, response) => {
  const responseJSON = {
    deathLogs,
  };

  respondJSON(request, response, 200, responseJSON);
};

const addLog = (request, response, body) => {
  const responseJSON = {
    message: 'All fields are required',
  };

  if (!body.name || !body.boss || !body.deaths || !body.strategy) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  const responseCode = 201;

  const logNumber = `logNumber${logNum}`;

  deathLogs[logNumber] = {};
  deathLogs[logNumber].name = body.name;
  deathLogs[logNumber].boss = body.boss;
  deathLogs[logNumber].deaths = body.deaths;
  deathLogs[logNumber].strategy = body.strategy;

  logNum++;

  responseJSON.deathLogs = deathLogs;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSON(request, response, responseCode, responseJSON);
};

module.exports = {
  getLogs,
  addLog,
};
