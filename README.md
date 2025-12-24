# 🛡️ Bypassing VdoCipher Protections

A sophisticated Frida-based instrumentation script designed to neutralize **VdoCipher Aegis** protection layers. It performs deep-level hooking on both Java (DEX) and Native (JNI) layers.

---

## ✨ Key Features

* **⚡ Bitmask Neutralization**: Overrides the centralized threat scoring system to return a zeroed (Safe) state.
* **📂 Filesystem Cloaking**: Intercepts `mount` point scanning and `File.exists()` calls to hide root traces.
* **🛠️ JNI Bridge Hooking**: Directly targets exported symbols in `libvdomain.so`.
* **🛰️ Environment Spoofing**: Forces system properties to report as official `release-keys`.
* **🚫 Anti-Debug Bypass**: Implements `ptrace` replacement to hide instrumentation.

---

## 🏗️ Technical Architecture

### ☕ Java Layer
Neutralizes `com.vdocipher.aegis.analytics.internal.AppAnalytics` methods.

### ⚙️ Native Layer
Hooks internal logic for root, emulator, and debugger detection within the `.so` library.

### 💻 Runtime Layer
Monitors `Runtime.exec` to prevent unauthorized shell integrity checks.

