import http from 'node:http';
import {randomUUID} from 'node:crypto';

const broadcasts = [];
const send = (response, status, body) => {
  response.writeHead(status, {'Content-Type':'application/json','Cache-Control':'no-store'});
  response.end(JSON.stringify(body));
};

http.createServer((request,response) => {
  if (request.method === 'GET' && request.url === '/health') {
    return send(response,200,{status:'healthy',service:'broadcast-gateway'});
  }
  if (request.method === 'GET' && request.url === '/api/broadcast/sms') {
    return send(response,200,{broadcasts});
  }
  if (request.method !== 'POST' || request.url !== '/api/broadcast/sms') {
    return send(response,404,{error:'Not found'});
  }
  let raw='';
  request.on('data',chunk => {
    raw += chunk;
    if (raw.length > 100_000) request.destroy();
  });
  request.on('end',() => {
    try {
      const payload=JSON.parse(raw);
      if (!payload.id || !payload.message || !payload.approvedBy) {
        return send(response,422,{error:'Alert id, message, and approver are required'});
      }
      const record={
        broadcastId:`BRD-${randomUUID().slice(0,8).toUpperCase()}`,
        alertId:payload.id,
        approvedBy:payload.approvedBy,
        channels:payload.channels || ['SMS'],
        status:'QUEUED',
        queuedAt:new Date().toISOString()
      };
      broadcasts.unshift(record);
      console.log(JSON.stringify({event:'broadcast.queued',...record}));
      send(response,202,record);
    } catch {
      send(response,400,{error:'Invalid JSON payload'});
    }
  });
}).listen(3000,'0.0.0.0',()=>console.log('Negarit broadcast gateway listening on :3000'));
