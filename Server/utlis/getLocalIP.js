import os from "os";

exports.getLocalIP = () => {
  const interfaces = os.networkInterfaces();
  let ipAddress = "127.0.0.1";

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        ipAddress = iface.address;
        break;
      }
    }
  }

  return ipAddress;
};
