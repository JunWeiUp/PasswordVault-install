# Password Vault (密码保险箱)

这是一个基于 Flutter 开发的安全、跨平台密码和数字资产管理应用。它旨在提供一个安全、私密且易于使用的环境，用于存储和管理您的各种在线账号密码、双重认证（TOTP）以及加密货币钱包凭证。

## ✨ 主要功能

- **🔐 多类型保管库**:
  - **密码管理**: 存储账号、密码、网站链接和备注，支持分类管理。
  - **双重认证 (TOTP)**: 内置 2FA 校验码生成器，支持标准 TOTP 协议。
  - **加密资产**: 安全存储加密货币助记词（Mnemonic）、私钥（Private Key）和钱包地址。
- **🛡️ 顶级安全保障**:
  - **强加密算法**: 使用 AES-GCM 256 位加密算法保护您的数据。
  - **密钥派生**: 采用 Argon2id（目前最先进的密钥派生函数之一）从主密码生成加密密钥，有效防御暴力破解。
  - **零知识架构**: 数据完全存储在本地设备中，不上传至任何中心化服务器，确保隐私。
- **🛠️ 便捷工具**:
  - **密码生成器**: 自定义长度和字符类型，生成高强度随机密码。
  - **助记词生成**: 支持生成符合 BIP39 标准的助记词。
  - **生物识别**: 支持指纹或面部识别快速解锁（在支持的设备上）。
- **☁️ 备份与同步**:
  - **本地导入导出**: 支持 CSV 格式数据的备份与恢复。
  - **WebDAV 同步**: 支持通过 WebDAV 协议进行云端备份，方便在不同设备间迁移数据。
- **🌍 跨平台支持**:
  - **移动端**: 支持 Android 和 iOS。
  - **桌面端/Web**: 支持 Web 平台。
  - **浏览器扩展**: 支持作为 Chrome/Edge 浏览器扩展运行，方便在网页端自动填充。

## 🛠️ 技术栈

- **框架**: [Flutter](https://flutter.dev/) (SDK ^3.5.4)
- **状态管理**: [Riverpod](https://riverpod.dev/)
- **路由**: [GoRouter](https://pub.dev/packages/go_router)
- **数据库**: [Drift](https://drift.simonbinder.eu/) (基于 SQLite，支持 Web 端 WASM)
- **安全逻辑**:
  - [cryptography](https://pub.dev/packages/cryptography): 核心加密算法 (AES-GCM, Argon2id)
  - [local_auth](https://pub.dev/packages/local_auth): 生物识别支持
- **网络与备份**:
  - [webdav_client](https://pub.dev/packages/webdav_client): WebDAV 协议支持
- **加密货币相关**:
  - [web3dart](https://pub.dev/packages/web3dart), [bip39](https://pub.dev/packages/bip39), [bip32](https://pub.dev/packages/bip32)
