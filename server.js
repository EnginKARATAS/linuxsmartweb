const http = require("node:http");

const hostname = "127.0.0.1";
const port = 3000;

const DBus = require("dbus");  

const bus = DBus.getBus("session"); 

const serviceName = "in.softprayog.add_server";
const objectPath = "/in/softprayog/adder";
const interfaceName = "in.softprayog.dbus_example";

const url = require("url");

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url, true); // GET endpoint
  if (reqUrl.pathname == "/users" && req.method === "GET") {
    console.log("Request type: " + req.method + " Endpoint: " + req.url);

    bus.getInterface(serviceName, objectPath, interfaceName, (err, iface) => {
      if (err) {
        console.error("Error getting interface:", err);
        return;
      }

      if (!iface.add_numbers) {
        console.error("Method add_numbers not found on interface");
        return;
      }

     
      iface.add_numbers("44 33", { timeout: 1000 }, (err, result) => {
        if (err) {
          console.error("Error calling method:", err);
          return;
        }

        console.log("Result from server:", result);
        res.statusCode = 200;
        res.setHeader("content-Type", "Application/json");
        res.end(JSON.stringify(result));
      });
    });
  }
});

server.listen(port, () => console.log(`server listening on port: ${port}`));
