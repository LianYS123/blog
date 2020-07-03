import React, { useState, useEffect } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import Markdown from 'markdown-to-jsx';
import { useLocation } from 'react-router-dom';

export default () => {
  const [value, handleChange] = useState('');
  const location = useLocation();
  useEffect(() => {
    console.log(location);
  }, [location]);
  useEffect(() => {
    // console.log(value);
  }, [value]);
  return (
    <>
      <SimpleMDE value={value} onChange={handleChange} />
      <Markdown>{value}</Markdown>
    </>
  );
};
