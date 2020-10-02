## macos安装nvm  
### 1.卸载已有的node相关模块  
如果你已经安装过node，需要先将原有的删除，避免冲突。
```sh
# 查看已经安装在全局的模块
npm ls -g --depth=0
# 删除全局 node_modules 目录
sudo rm -rf /usr/local/lib/node_modules
# 删除 node
sudo rm /usr/local/bin/node 
# 删除全局 node 模块注册的软链
cd /usr/local/bin && ls -l | grep "../lib/node_modules/" | awk '{print $9}'| xargs rm
```  

### 2.安装nvm
1. 用户目录下新建.bash_profile文件`touch ~/.bash_profile`
2. 下载nvm `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash`  

### 2.修改shell  
#### 修改iTerm2 shell
由于新的macOS Catalina系统默认的终端由bash改为了zsh, nvm会导致找不到.bash_profile配置文件，报错`nvm: command not found`。解决方法：
```sh
# 1.新建一个 .zshrc 文件（如果没有的话）
touch ~/.zshrc
# 2.在 ~/.zshrc文件最后，增加一行 
source ~/.bash_profile
```
#### vscode配置zsh
如果你要在vscode里用TERMINAL终端，会发现还是bash，vscode需要手动配置。  
***文件->首选项->设置->搜索'terminal.integrated.shell.osx'->设置为'zsh'***

## nvm使用
### 常用指令
```sh
nvm off                     # 禁用node.js版本管理(不卸载任何东西)
nvm on                      # 启用node.js版本管理
nvm install <version>       # 安装指定版本node,例如nvm install 12.18.3
nvm uninstall <version>     # 卸载指定版本node,例如nvm uninstall 12.18.3 
nvm list                    # 显示所有安装的node.js版本
nvm list available          # 显示可以安装的所有node.js的版本(windows系统)
nvm use <version>           # 切换到使用指定的nodejs版本，例如nvm use 12.18.3
```
### 切换node版本
```sh
nvm install v5.7.0          # 安装v5.7.0
nvm install stage           # 安装最新稳定版(v14.13.0)
nvm use v14.13.0            # node切换到v14.13.0
```
### 预设node版本
当你新开一个shell终端，输入nvm，会发现当前指向的node版本为空。这是因为nvm use只在当前shell生效。（不过我在windows系统没这问题）  
解决办法：预设node版本`nvm alias default <version>`。  
```sh
# 设置node默认版本为v14.13.0
nvm alias default v14.13.0 
```