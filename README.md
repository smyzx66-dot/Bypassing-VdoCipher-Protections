# 🚀 Bypassing VdoCipher Protections

🧬 **Frida-based runtime analysis script** for studying **VdoCipher Aegis** protections on Android.

---

## 🔍 Overview
This project demonstrates how **VdoCipher evaluates device security** at runtime by inspecting:

- 📱 Rooted environments  
- 🧪 Emulators  
- 🛠️ Debug / Instrumentation (Frida)  
- ⚙️ Java & Native (`libvdomain.so`) logic  

The goal is to understand **how security signals are aggregated**, not to provide a guaranteed bypass.

---

## 🧩 What it targets
- 🧬 Java layer (`AppAnalytics`)
- 🧱 Native layer (`libvdomain.so`)
- 🔁 Java ↔ Native decision flow

---

## 🎯 Purpose
- 🔬 Security research  
- 📚 Reverse engineering learning  
- 🧠 Understanding Android protection mechanisms  

---

## ⚠️ Disclaimer
🚨 **Educational & research use only**  
Do not use this project on applications you don’t own or have permission to test.

---

## 📝 Notes
- VdoCipher protections change between versions  
- This project focuses on **concepts**, not guaranteed results
