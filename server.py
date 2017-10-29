from flask import Flask
from flask.ext.spyne import Spyne
from spyne.protocol.soap import Soap11
from spyne.model.primitive import Unicode, Integer, Float
from spyne.model.complex import Iterable

app = Flask(__name__)
spyne = Spyne(app)

class SomeSoapService(spyne.Service):
    __service_url_path__ = '/soap/someservice'
    __in_protocol__ = Soap11(validator='lxml')
    __out_protocol__ = Soap11()

    @spyne.srpc(Float, Float, _returns=Iterable(Float))
    def echo(w, h):
        h_in_m = h / 100
        BMI = w / (h_in_m**2)
        yield float("{0:.2f}".format(BMI))

if __name__ == '__main__':
    app.run(host = '127.0.0.1')