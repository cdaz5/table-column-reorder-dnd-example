import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import generateData from './generate-data';

const { columns, data } = generateData(5);

const App = () => {
  const [cols, setCols] = useState(columns);
  const [rows, setRows] = useState(data);
  const [dragOver, setDragOver] = useState('');

  const handleDragStart = e => {
    const { id } = e.target;
    const idx = cols.indexOf(id);
    e.dataTransfer.setData('colIdx', idx);
  };

  const handleDragOver = e => e.preventDefault();
  const handleDragEnter = e => {
    const { id } = e.target;
    setDragOver(id);
  };

  const handleOnDrop = e => {
    const { id } = e.target;
    const droppedColIdx = cols.indexOf(id);
    const draggedColIdx = e.dataTransfer.getData('colIdx');
    const tempCols = [...cols];

    tempCols[draggedColIdx] = cols[droppedColIdx];
    tempCols[droppedColIdx] = cols[draggedColIdx];
    setCols(tempCols);
    setDragOver('');
  };

  return (
    <div className="App">
      <Table>
        <thead>
          <tr>
            {cols.map(col => (
              <StyledTh
                id={col}
                key={col}
                draggable
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleOnDrop}
                onDragEnter={handleDragEnter}
                dragOver={col === dragOver}
              >
                {col}
              </StyledTh>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.id}>
              {Object.entries(row).map(([k, v], idx) => (
                <Cell key={v} dragOver={cols[idx] === dragOver}>
                  {row[cols[idx]]}
                </Cell>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default App;

const Table = styled.table`
  border-collapse: collapse;
`;

const Cell = styled.td`
  font-size: 14px;
  text-align: left;
  text-transform: capitalize;
  vertical-align: center;
  padding: 20px;
  border-bottom: 2px solid #eef0f5;
  text-transform: lowercase;
  border-left: ${({ dragOver }) => dragOver && '5px solid red'};
`;

const StyledTh = styled.th`
  white-space: nowrap;
  color: #716f88;
  letter-spacing: 1.5px;
  font-weight: 600;
  font-size: 14px;
  text-align: left;
  text-transform: capitalize;
  vertical-align: middle;
  padding: 20px;
  border-bottom: 2px solid #eef0f5;
  text-transform: uppercase;
  border-left: ${({ dragOver }) => dragOver && '5px solid red'};
`;

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
