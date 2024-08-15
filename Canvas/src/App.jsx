import React, { useCallback } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,Controls,ControlButton
} from '@xyflow/react';
 
import '@xyflow/react/dist/style.css';
import magicWand from './assets/magicwand.svg';
import CustomResizerNode from './component/CustomResizerNode';
const nodeTypes = {
  CustomResizerNode,
};
const initialNodes = [
  { id: '1',type: 'CustomResizerNode', position: { x: 0, y: 0 }, data: { label: 'Add notes like this', button: 'this is a button' },style: { width: 200, height: 100 ,background: '#c1cfe5'} },
  
];
const initialEdges = [];
 
export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
 
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
  const handleClick = () => {
    setNodes((nodes) => [
      ...nodes,
      {
        id: String(nodes.length + 1),
        position: { x: Math.random() * 100, y: Math.random() * 100 },
        data: {label: 'New Node'},
        style: { width: 200, height: 100 ,background: '#c1cfe5'},
  }
    ]);
  }
 
  return (
    <>
    <div className='flex justify-center items-center text-2xl flex-col'>
      <h1 className='text-3xl font-bold'>Canvas</h1>
      <br />
      <label>Text</label>
      <div className='flex space-x-0.5 > * + * '>  
        <input className='border border-black' type='text' value="Enter text"/>
      <button className='border border-black p-2' onClick={handleClick}>Submit</button>
      </div>
      <div/>
    </div>
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Background />
        <Controls>
          <ControlButton icon={magicWand} title="Magic Wand" onClick={() => console.log('Magic Wand clicked')} />
        </Controls>
      </ReactFlow>
      
    </div>
    </>
  );
}