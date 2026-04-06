console.log("🚀 Loader starting...");

// Global error handler for better debugging
window.onerror = function(message, source, lineno, colno, error) {
  console.error("❌ Global JS Error:", message, "at", source, ":", lineno, ":", colno);
  if (error && error.stack) console.error(error.stack);
  return false;
};

window.onunhandledrejection = function(event) {
  console.error("❌ Unhandled Promise Rejection:", event.reason);
};

// Bridge for Flutter to communicate with Chrome Extension API
window.hasChromeApi = function() {
  const has = typeof chrome !== 'undefined' && !!chrome.runtime && !!chrome.runtime.id;
  console.log("🔍 hasChromeApi check:", has);
  return has;
};

window.chromeSendMessage = function(message) {
  console.log("📤 Sending message to background:", message.type || 'unknown');
  return new Promise((resolve, reject) => {
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
      chrome.runtime.sendMessage(message, (response) => {
        if (chrome.runtime.lastError) {
          console.warn("⚠️ chromeSendMessage error:", chrome.runtime.lastError.message);
          resolve(null);
        } else {
          console.log("📥 Received response:", response ? 'success' : 'null');
          resolve(response || null);
        }
      });
    } else {
      console.warn("⚠️ Chrome Extension API not available for sendMessage");
      resolve(null);
    }
  });
};

window.chromeStorageGet = function(key) {
  console.log("📦 Reading from storage:", key);
  return new Promise((resolve) => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get([key], (result) => {
        if (chrome.runtime.lastError) {
          console.warn("⚠️ chromeStorageGet error:", chrome.runtime.lastError.message);
          resolve(null);
        } else {
          resolve(result[key] || null);
        }
      });
    } else {
      console.warn("⚠️ Chrome Storage API not available");
      resolve(null);
    }
  });
};

window.chromeStorageSet = function(key, value) {
  console.log("📦 Writing to storage:", key);
  return new Promise((resolve) => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      const data = {};
      data[key] = value;
      chrome.storage.local.set(data, () => {
        if (chrome.runtime.lastError) {
          console.warn("⚠️ chromeStorageSet error:", chrome.runtime.lastError.message);
        }
        resolve(null);
      });
    } else {
      console.warn("⚠️ Chrome Storage API not available");
      resolve(null);
    }
  });
};

window.chromeStorageRemove = function(key) {
  console.log("🗑️ Removing from storage:", key);
  return new Promise((resolve) => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.remove([key], () => {
        resolve(null);
      });
    } else {
      resolve(null);
    }
  });
};

window.addEventListener('load', function(ev) {
  console.log("🚀 window load event fired");
  
  // 强制使用本地 CanvasKit
  window.flutterConfiguration = {
    canvasKitBaseUrl: "canvaskit/"
  };

  _flutter.loader.loadEntrypoint({
    serviceWorkerSettings: null,
    onEntrypointLoaded: function(engineInitializer) {
      console.log("📦 entrypoint loaded, initializing engine...");
      
      const config = {
        canvasKitBaseUrl: "canvaskit/",
        useColorEmoji: true
      };

      engineInitializer.initializeEngine(config).then(function(appRunner) {
        console.log("🏃 engine initialized, running app...");
        appRunner.runApp();
      }).catch(function(err) {
        console.error("❌ Engine initialization failed:", err);
        // 如果 CanvasKit 初始化失败，尝试强制使用 HTML 渲染器
        console.log("🔄 Retrying with HTML renderer...");
        engineInitializer.initializeEngine({
            renderer: 'html'
        }).then(function(appRunner) {
            appRunner.runApp();
        });
      });
    }
  });
});
