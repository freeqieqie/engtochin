const trainingData = {
    sessions: [], // 使用数组存储所有训练会话
    currentSession: null
};

// 如果localStorage中已有数据，则加载
if (typeof window !== 'undefined') {
    const savedData = localStorage.getItem('trainingData');
    if (savedData) {
        Object.assign(trainingData, JSON.parse(savedData));
    }
    window.trainingData = trainingData;
}

// 如果在Node.js环境
if (typeof module !== 'undefined') {
    module.exports = trainingData;
}
