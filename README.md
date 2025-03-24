# 🐻 Beariot OLED Installation

A simple Node.js script to display system stats on an **OLED I2C display** using a Raspberry Pi 4 running **Ubuntu 24.04**.

## 🚀 Features
- 📡 **Displays IP Address**
- 🔥 **CPU Usage (%) & Temperature (°C)**
- 🖥️ **RAM Usage (GB)**
- 💾 **Storage Usage (GB)**
- 🔄 **Auto-refreshes every 5 seconds**

---

## 📦 Installation
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/beariot-oled.git
cd beariot-oled
```

### 2️⃣ Install Dependencies
```sh
npm install
```

---

## ▶️ Run the Script
```sh
node stats.js
```

> The system stats will now be displayed on your **OLED screen**.

---

## 🔄 Run on Boot (Optional)
To make the script run automatically on startup:
1. Create a **systemd service**:
   ```sh
   sudo nano /etc/systemd/system/beariot-oled.service
   ```
2. Add the following:
   ```ini
   [Unit]
   Description=Beariot OLED System Info
   After=network.target

   [Service]
   ExecStart=/usr/bin/node /home/ubuntu/beariot-oled/stats.js
   Restart=always
   User=ubuntu
   Group=ubuntu
   Environment=NODE_ENV=production
   WorkingDirectory=/home/ubuntu/beariot-oled

   [Install]
   WantedBy=multi-user.target
   ```
3. Enable and start the service:
   ```sh
   sudo systemctl enable beariot-oled
   sudo systemctl start beariot-oled
   ```

---

## 🛠 Dependencies
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [oled-i2c-bus](https://www.npmjs.com/package/oled-i2c-bus)
- [systeminformation](https://www.npmjs.com/package/systeminformation)
- [i2c-bus](https://www.npmjs.com/package/i2c-bus)

---

## 🎯 Example Output on OLED
```
IP: 192.168.1.100
CPU: 12.5%
Temp: 45.3°C
RAM: 1.25/4.00GB
Storage: 8.12/32.00GB
```

---

## 📜 License
MIT License © 2025 **Beariot Team**

---

## 💬 Need Help?
For any questions or issues, feel free to open an **issue** or reach out! 🚀

