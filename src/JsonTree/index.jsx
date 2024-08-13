import React, { useState } from 'react';
import { Container, Grid, TextField, Typography, Paper } from '@mui/material';

import './css/index.css'

export default function JsonTree() {
  const [jsonInput, setJsonInput] = useState('');
  const [jsonError, setJsonError] = useState('');
  const [treeData, setTreeData] = useState(null);

  // 拿到左侧输入的json值
  const handleJsonInput = (event) => {
    const input = event.target.value;
    setJsonInput(input);
    // 将输入框中的值转为JSON格式，使用try catch捕获错误
    try {
      const parsedJson = JSON.parse(input);
      setJsonError('');
      setTreeData(parsedJson);
    } catch (error) {
      setJsonError('JSON 格式不正确');
      setTreeData(null);
    }
  };

  // 右侧数据的展示
  const renderTree = (data, indent = 0) => {
    if (typeof data !== 'object' || data === null) {
      return (
        // <Typography key={indent} style={{ marginLeft: indent * 20 }}>
        //   {data}
        // </Typography>
        <span key={indent}>{data}</span>
      );
    }
    return Object.keys(data).map((key) => (
      <div key={key}>
        <Typography style={{ marginLeft: indent * 20 }}>
          {key}:{renderTree(data[key], indent + 1)}
        </Typography>
        {/* <div>{renderTree(data[key], indent + 1)}</div> */}
      </div>
    ));
  };

  return (
    <Container>
      {/* json输入框 */}
      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        <Grid item xs={6}>
          <TextField
            label="输入 JSON"
            variant="outlined"
            fullWidth
            multiline
            rows={20}
            value={jsonInput}
            onChange={handleJsonInput}
            error={!!jsonError}
            helperText={jsonError}
          />
        </Grid>

        {/* 数据展示框 */}
        <Grid item xs={6}>
          <Paper variant="outlined" style={{ padding: '10px', minHeight: '460px' }}>
            {treeData ? renderTree(treeData) : <Typography>请输入有效的 JSON 字符串。</Typography>}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}