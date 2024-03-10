const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// 使用body-parser中间件解析POST请求的JSON数据
app.use(bodyParser.json());

// 模拟用户数据存储
let users = [
  { id: 1, username: 'john_doe', password: 'password123', meditations: [] },
  // 添加更多用户数据...
];

// 处理获取用户冥想会话的请求
app.get('/meditations/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find((u) => u.id === userId);

  if (user) {
    res.json({ meditations: user.meditations });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// 处理添加新冥想会话的请求
app.post('/meditations/:userId/add', (req, res) => {
  const userId = parseInt(req.params.userId);
  const { sessionName, duration, guide, audioUrl } = req.body;

  const user = users.find((u) => u.id === userId);

  if (user) {
    const newMeditation = { id: user.meditations.length + 1, sessionName, duration, guide, audioUrl };
    user.meditations.push(newMeditation);
    res.json({ message: 'Meditation session added successfully', meditation: newMeditation });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// 处理获取放松音效的请求
app.get('/relaxing-sounds', (req, res) => {
  // 返回模拟的放松音效数据（实际应用中可能需要存储音效文件或调用外部API）
  const relaxingSounds = [
    { id: 1, name: 'Ocean Waves', audioUrl: 'https://example.com/ocean-waves.mp3' },
    { id: 2, name: 'Birdsong', audioUrl: 'https://example.com/birdsong.mp3' },
    // 添加更多放松音效数据...
  ];

  res.json({ relaxingSounds });
});

// 启动Express应用程序
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
