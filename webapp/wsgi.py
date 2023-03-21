from werkzeug.middleware import dispatcher

from flask_app import flask_app
from currentbillsdashboard import app as app1
from topbillsdashboard import app as app2

application = dispatcher.DispatcherMiddleware(flask_app, {
    '/currentbillsdashboard': app1.server,
    '/topbillsdashboard': app2.server
})