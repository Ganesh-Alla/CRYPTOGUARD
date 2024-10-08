# CRYPTOGUARD

**Version:** 1.0.0
**Platform:** React Native with Expo

## Overview

**CRYPTOGUARD** is a mobile application designed for secure text encryption using a variety of algorithms. It provides users with the ability to convert plain text into cipher text using well-known cryptographic algorithms such as Caesar Cipher, DES, AES, RSA, SHA, MD5, and Playfair.

## Features

- **Multiple Encryption Algorithms:** Support for Caesar Cipher, DES, AES, RSA, SHA, MD5, and Playfair.
- **Cross-Platform Support:** Runs on Android, iOS, and Web via Expo.
- **Clipboard Integration:** Easy copy and paste functionality using `expo-clipboard`.
- **Responsive UI:** Optimized for a seamless user experience across devices.
- **Secure Data Handling:** Utilizes `crypto-js` and `text-ciphers` for robust encryption.

## Installation

To get started with CRYPTOGUARD, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/cryptoguard.git
   cd cryptoguard
2. **Install Dependencies:**
   ```bash
   npm install
3. **Start the Application:**

   - **For Android:**
     ```bash
     npm run android
     ```

   - **For iOS:**
     ```bash
     npm run ios
     ```

   - **For Web:**
     ```bash
     npm run web
     ```


## Scripts

- `start`: Starts the Expo development server.
- `android`: Starts the application on an Android device/emulator.
- `ios`: Starts the application on an iOS simulator.
- `web`: Starts the application in a web browser.

## Dependencies

- **Expo:** Development framework and tools for building React Native apps.
- **Crypto-JS:** JavaScript library for encryption standards.
- **Text-Ciphers:** Library for text-based cipher algorithms.
- **React Native Vector Icons:** Customizable icons for React Native applications.
- **MathJS:** Library for advanced math operations.
- **NativeWind:** Utility-first CSS framework for React Native.
- **TailwindCSS:** CSS framework used for styling components.

## Development Dependencies

- **Babel:** JavaScript compiler used to convert ECMAScript 2015+ code into a backwards-compatible version of JavaScript.

## Usage

After starting the app, users can select the desired encryption algorithm, input their text, and receive the encrypted output. The app also provides options to copy the encrypted text to the clipboard for easy sharing or storing.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
