const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

// 添加新词条到词库
app.post('/add-word', (req, res) => {
    const { english, chinese } = req.body;
    if (!english || !chinese) {
        return res.status(400).json({ error: '英文和中文都是必需的' });
    }

    const dictionaryPath = path.join(__dirname, 'dictionary.js');
    
    try {
        // 读取当前词库文件
        let content = fs.readFileSync(dictionaryPath, 'utf8');
        
        // 解析现有的dictionary对象
        const match = content.match(/const dictionary = ({[\s\S]*?});/);
        if (!match) {
            throw new Error('无法解析词库文件');
        }
        
        let dictionary = eval('(' + match[1] + ')');
        
        // 添加新词条
        dictionary[english.toLowerCase()] = chinese;
        
        // 按键排序
        const sortedDict = {};
        Object.keys(dictionary).sort().forEach(key => {
            sortedDict[key] = dictionary[key];
        });
        
        // 生成新的文件内容
        const newContent = `const dictionary = ${JSON.stringify(sortedDict, null, 4)};

// 如果在浏览器环境
if (typeof window !== 'undefined') {
    window.dictionary = dictionary;
}

// 如果在Node.js环境
if (typeof module !== 'undefined') {
    module.exports = dictionary;
}`;
        
        // 写入文件
        fs.writeFileSync(dictionaryPath, newContent, 'utf8');
        
        res.json({ success: true, message: '词条添加成功' });
    } catch (error) {
        console.error('更新词库失败:', error);
        res.status(500).json({ error: '更新词库失败' });
    }
});

const PORT = 3001; // 改用3001端口
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`端口 ${PORT} 被占用，请尝试其他端口`);
    } else {
        console.error('启动服务器失败:', err);
    }
});
