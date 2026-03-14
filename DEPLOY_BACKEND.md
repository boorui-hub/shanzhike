# 部署后端到Render步骤

请按照以下步骤在Render上部署后端服务：

1. **登录Render账号**
   - 访问 https://render.com
   - 使用您的GitHub账号登录

2. **创建新服务**
   - 点击页面右上角的 "New"，选择 "Web Service"
   - 选择 "GitHub" 作为代码源
   - 搜索并选择 `boorui-hub/shanzhike` 仓库
   - 分支选择 `main`

3. **配置服务**
   - 服务名称: `shanzhike-backend`
   - 环境: `Node`
   - 构建命令: `npm install`
   - 启动命令: `npm start`
   - 区域: 选择离您最近的区域（如 Oregon）
   - 实例类型: 选择 "Free"

4. **部署**
   - 点击 "Create Web Service"
   - Render会自动构建和部署您的后端服务

5. **获取API URL**
   - 部署完成后，Render会提供一个API URL（如 `https://shanzhike-backend.onrender.com`）
   - 请将此URL提供给我，以便我更新前端配置

部署完成后，后端服务将在 `https://shanzhike-backend.onrender.com` 运行，提供API接口。