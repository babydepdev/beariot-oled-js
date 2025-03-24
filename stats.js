const os = require("os");
const si = require("systeminformation");
const i2c = require("i2c-bus");
const Oled = require("oled-i2c-bus");
const font = require("oled-font-5x7");

const i2cBus = i2c.openSync(1);
const opts = { width: 128, height: 64, address: 0x3c };
const oled = new Oled(i2cBus, opts);

function getIPAddress() {
  const interfaces = os.networkInterfaces();
  for (let iface in interfaces) {
    for (let i = 0; i < interfaces[iface].length; i++) {
      const addr = interfaces[iface][i];
      if (addr.family === "IPv4" && !addr.internal) {
        return addr.address;
      }
    }
  }
  return "No IP";
}

async function getSystemInfo() {
  try {
    const cpuLoad = await si.currentLoad();
    const cpuTemp = await si.cpuTemperature();
    const mem = await si.mem();
    const disk = await si.fsSize();

    const ip = getIPAddress();
    const cpuUsage = cpuLoad.currentLoad.toFixed(1);
    const temperature = cpuTemp.main.toFixed(1);
    const ramUsed = (mem.used / 1e9).toFixed(2);
    const ramTotal = (mem.total / 1e9).toFixed(2);
    const storageUsed = (disk[0].used / 1e9).toFixed(2);
    const storageTotal = (disk[0].size / 1e9).toFixed(2);

    oled.clearDisplay();
    oled.setCursor(1, 1);
    oled.writeString(font, 1, `Beariot Edge`, 1, true);
    oled.setCursor(1, 10);
    oled.writeString(font, 1, `IP: ${ip}`, 1, true);
    oled.setCursor(1, 20);
    oled.writeString(font, 1, `CPU: ${cpuUsage}%`, 1, true);
    oled.setCursor(1, 30);
    oled.writeString(font, 1, `CPU Temp: ${temperature}°C`, 1, true);
    oled.setCursor(1, 40);
    oled.writeString(font, 1, `RAM: ${ramUsed}/${ramTotal}GB`, 1, true);
    oled.setCursor(1, 50);
    oled.writeString(
      font,
      1,
      `Storage: ${storageUsed}/${storageTotal}GB`,
      1,
      true
    );
  } catch (error) {
    console.error("Error fetching system info:", error);
  }
}

setInterval(getSystemInfo, 5000);
