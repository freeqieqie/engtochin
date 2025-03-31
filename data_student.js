const studentData = {
    records: []  // 存储所有学生的训练记录
};

// 如果localStorage中已有数据，则加载
if (typeof window !== 'undefined') {
    const savedData = localStorage.getItem('studentData');
    if (savedData) {
        Object.assign(studentData, JSON.parse(savedData));
    }
    window.studentData = studentData;
}

// 如果在Node.js环境
if (typeof module !== 'undefined') {
    module.exports = studentData;
}
