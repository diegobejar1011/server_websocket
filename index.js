const { WebSocketServer, WebSocket} = require('ws');
const wss = new WebSocketServer({ port: 3000});

let preguntas = [
    {
      "pregunta": "¿Cuál es la capital de Francia?",
      "opciones": ["Madrid", "Berlín", "Londres", "París"],
      "respuesta_correcta": "París"
    },
    {
      "pregunta": "¿En qué año se fundó la ONU?",
      "opciones": ["1935", "1945", "1955", "1965"],
      "respuesta_correcta": "1945"
    },
    {
      "pregunta": "¿Cuál es el símbolo químico del agua?",
      "opciones": ["CO2", "H2O", "O2", "CH4"],
      "respuesta_correcta": "H2O"
    },
    {
      "pregunta": "¿Quién escribió 'Cien años de soledad'?",
      "opciones": ["Mario Vargas Llosa", "Julio Cortázar", "Gabriel García Márquez", "Isabel Allende"],
      "respuesta_correcta": "Gabriel García Márquez"
    },
    {
      "pregunta": "¿Cuántos planetas hay en nuestro sistema solar?",
      "opciones": ["Nueve", "Ocho", "Diez", "Doce"],
      "respuesta_correcta": "Ocho"
    }
];

let preguntaActual = 0;

wss.on('connection', ws => {

    console.log('cliente conectado');

    wss.on('message', (confirmacion) => {
      if(confirmacion){
        if(preguntaActual === preguntas.length - 1) {
          enviarCliente("Juego finalizado");
        }else {
          preguntaActual++;
          enviarCliente(preguntas[preguntaActual]);
        }
      } 
    })

    enviarCliente(preguntas[preguntaActual]);

    
    
});

function enviarCliente (message) {
  wss.clients.forEach( client => {
    if(client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  })
}