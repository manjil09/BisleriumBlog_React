import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TruncateText = ({ text, maxLength }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const truncatedText = text.length > maxLength ? `${text.substring(0, maxLength).trim()}...` : text;

  return (
    <div className="truncate-container">
      <p className={`overflow-hidden ${expanded ? '' : 'line-clamp-2'} text-base`}>
        {truncatedText}
      </p>
      {text.length > maxLength && (
        <button onClick={toggleExpand} className="text-blue-500 ml-2">
          {expanded ? "See less" : "See more"}
        </button>
      )}
      {expanded && (
        <Link to="/fullPost" className="text-blue-500 ml-2">
          Continue reading
        </Link>
      )}
    </div>
  );
};

export default TruncateText;
