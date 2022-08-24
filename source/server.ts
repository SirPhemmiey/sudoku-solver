import http from 'http';
import { app } from '.';
let server: http.Server;

app.set('port', process.env.PORT || 9000); //this should ideally be gotten from env and 9000 should be the fallback port

server = app.listen(app.get('port'), () => {
    console.log(
        'App is running at http://localhost:%d in %s mode',
        app.get('port'),
        app.get('env')
    );
    console.log('Press CTRL+C to stop\n');
});

export default server;
