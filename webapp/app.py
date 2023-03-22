from werkzeug.middleware.dispatcher import DispatcherMiddleware
from werkzeug.serving import run_simple
from currentbillsdashboard import app as app1
from topbillsdashboard import app as app2
from flask_app import flask_app


application = DispatcherMiddleware(flask_app, {
    '/currentbillsdashboard': app1.server,
    '/topbillsdashboard': app2.server
})


if __name__ == '__main__':
    run_simple('0.0.0.0', 8050, application, use_reloader=True)